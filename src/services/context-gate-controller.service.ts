import { Injectable } from '@angular/core';
import { MapfreService } from 'services/mapfre.service';
import { MessagesService } from 'services/messages.service';
import { ParteService } from 'services/parte.service';
import { ExternalsService } from 'services/externals.service';
import { BotResponse } from 'app/classes/BotResponse';
import { Message } from 'app/classes/Message';
import * as GLOBALS from 'app/app.constants';
import { BotContext } from 'app/classes/BotContext';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as operations from 'app/classes/ContextOperator';
//importamos el componente de text to speech ya instalado
import {TextToSpeech} from '@ionic-native/text-to-speech';

const CONTRARY_DATA_MAPPER = {
  'collectdatacontrary_dialog_params_lastname': {
    from: 'firstName',
    to: 'nombre'
  },
  'collectdatacontrary_dialog_params_dni': {
    from: 'lastName',
    to: 'apellidos'
  }
};

/**
 *  The main logic of the application, manages communication between MapfrecitoComponent an all the services involved in the process
 */
@Injectable()
export class ContextGateController {
  //variable respuestavoz que contendra el speech del bot
  public respuestavoz='';
  private finished$: Observable<boolean>;
  private finished: Observer<boolean>;
  //variables para le text to speech
  text: string;
  rate: number;
  locale: string;
  
  /**
   * Injecting all the services involved in the application
   */
  constructor(
    private mapfre: MapfreService,
    private parte: ParteService,
    private externals: ExternalsService,
    private messages: MessagesService,
    //objeto de la clase text to speech
    private tts: TextToSpeech
  ) {
    this.finished$ = Observable.create((observer: Observer<any>) => {
      this.finished = observer;
      this.finished.next(false);
    });
    //Idioma de la voz y asignación del speech del bot a la variable text
    this.text = 
    this.respuestavoz;
    this.rate = 1;
    this.locale = 'es-MX';
    
  }

  public hasFinished (): Observable<boolean> {
    return this.finished$;
  }

  public sendLoginAsegurado(nombre: string) {
    this.sendInvisibleMessage(`Login: ${nombre}`);
  }

  public sendVisibleMessage(text: string) {
    this.messages.addMessage(new Message(text, GLOBALS.MESSAGE_TEXT, GLOBALS.STR_USER, GLOBALS.STR_BOT));
    this.waitAndMapResponse(this.mapfre.sendQuery(text));
  }


  public sendInvisibleMessage(text: string) {
    this.waitAndMapResponse(this.mapfre.sendQuery(text));
  }
  //metodo que reproduce el speech dle bot
  playText() {
    this.tts.speak({
      text: this.respuestavoz,
      rate: this.rate,
      locale: this.locale
    })
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
  }

  private waitAndMapResponse(objectObservable: Observable<Object>) {
    objectObservable.subscribe((dialogResponse: any) => {
      let respuestaBot: BotResponse = new BotResponse();
      //Mapping all data
      const {
        result: {
          resolvedQuery,
          fulfillment: { speech },
          parameters,
          contexts,
          metadata: { intentName }
        }
      } = dialogResponse;
      respuestaBot.pregunta = resolvedQuery;
      //respuesta (speech) que emite el bot
      respuestaBot.speech = speech;
      respuestaBot.paramsRespose = parameters;

      //asignación de valor a respuestavoz
      this.respuestavoz=respuestaBot.speech;
      //llamado al método del speech to text
      this.playText();
      
      respuestaBot.contexts = contexts.map((context) => {
        let context1: BotContext = new BotContext();
        context1.name = context.name;
        context1.params = context.params;
        return context1;
      });
      respuestaBot.intent = intentName

      this.responseGate(respuestaBot);
    });
  }

  private responseGate(botResponse: BotResponse) {
    console.log(botResponse);

    const { speech, contexts, intent, paramsRespose } = botResponse;

    switch (true) {

      case (operations.only_contains(contexts, 'yesaccidentreport')):

        this.messages.addMessage(
          new Message(
            speech,
            GLOBALS.MESSAGE_TEXT,
            GLOBALS.STR_BOT,
            GLOBALS.STR_USER,
            contexts[0],
            intent
          )
        );

        setTimeout(() => {
          this.sendInvisibleMessage(this.parte.getDatosAsegurado());
        }, Math.floor(Math.random() * 5001));

        break;

      case (operations.only_contains(contexts, 'takevideo')):

        this.messages.addMessage(
          new Message(
            speech,
            GLOBALS.MESSAGE_VIDEO_INTENT,
            GLOBALS.STR_BOT,
            GLOBALS.STR_USER,
            contexts[0],
            intent
          )
        );

        break;

        case (operations.only_contains(contexts, 'takeimages')):

        this.messages.addMessage(
          new Message(
            speech,
            GLOBALS.MESSAGE_CAMERA_INTENT,
            GLOBALS.STR_BOT,
            GLOBALS.STR_USER,
            contexts[0],
            intent
          )
        );

        break;

      case (operations.only_contains(contexts, 'collectdata')):

        this.updateDriverData(paramsRespose);
        this.messages.addMessage(
          new Message(
            speech,
            GLOBALS.MESSAGE_MATRICULA2_INTENT,
            GLOBALS.STR_BOT,
            GLOBALS.STR_USER,
            contexts[0],
            intent
          )
        );

        break;

      case (operations.only_contains(contexts, 'carregistrationcontrary')):

        this.parte.contrario.matricula = paramsRespose.matriculaContrario;

        this.getDatosContrarioMedianteMatricula();

        this.messages.addMessage(
          new Message(
            speech,
            GLOBALS.MESSAGE_DNI_INTENT,
            GLOBALS.STR_BOT,
            GLOBALS.STR_USER,
            contexts[0],
            intent
          )
        );

        break;

      case (operations.only_contains(contexts, 'endcaptures')):

        this.messages.addMessage(
          new Message(
            speech,
            GLOBALS.MESSAGE_AUDIO_INTENT,
            GLOBALS.STR_BOT,
            GLOBALS.STR_USER,
            contexts[0],
            intent
          )
        );

        break;

      case (intent ==='TakeAudioDescription') :

        this.endChatMessage(botResponse);

        break;

      case (operations.only_contains(contexts, 'collectdatacontrary')) :

        if (!this.parte.contraryDataFromCaptureImage) {
          this.parte.contrario.dni = paramsRespose.DNI;
        }
        this.messages.addMessage(
          new Message(
            speech,
            GLOBALS.MESSAGE_PHONE_FORM,
            GLOBALS.STR_BOT,
            GLOBALS.STR_USER,
            contexts[0],
            intent
          )
        );

        break;

      case (operations.contains(contexts, 'collectdatacontrary_dialog_params_lastname')) :

        this.fillContraryData('collectdatacontrary_dialog_params_lastname', botResponse);

        break;

      case (operations.contains(contexts, 'collectdatacontrary_dialog_params_dni')) :

        this.fillContraryData('collectdatacontrary_dialog_params_dni', botResponse);

        break;

      case (operations.contains(contexts, 'getphonecontrary')) :

        this.selectActionMessage(botResponse);

        break;

      default:
        /* EL COMPORTAMIENTO POR DEFECTO CUANDO SE LEE UNA RESPUESTA_ACTUAL_TEXTO
        DEBE SER PINTAR EL MENSAJE DEL BOT, UN MENSAJE NORMAL */
        this.messages.addMessage(
          new Message(
            speech,
            GLOBALS.MESSAGE_TEXT,
            GLOBALS.STR_BOT,
            GLOBALS.STR_USER,
            contexts[0],
            intent
          )
        );

        break;
    }
  }

  private endChatMessage (botResponse) {
    const { speech, contexts: [context], intent } = botResponse;
    const showPart = function () {
      this.finished.next(true);
      this.finished.complete();
    }

    const finishOptions = [{
      label: 'Ver parte',
      action: showPart.bind(this)
    }];

    this.messages.addMessage(
      new Message(
        speech,
        GLOBALS.MESSAGE_BUTTONS,
        GLOBALS.STR_BOT,
        GLOBALS.STR_USER,
        context,
        intent,
        finishOptions
      )
    );
  }

  private selectActionMessage (botResponse): void {
    const { speech, contexts: [context], intent } = botResponse;
    const sendAction = function (text) {
      this.sendInvisibleMessage(text);
    }

    const selectActionOptions = [{
      label: 'Video',
      action: () => {
        sendAction.call(this, 'Hacer video');
      }
    }, {
      label: 'Fotos',
      action: () => {
        sendAction.call(this, 'Hacer fotos');
      }
    }, {
      label: 'Paso',
      action: () => {
        sendAction.call(this, 'PasarCaptura');
      }
    }];

    this.messages.addMessage(
      new Message(
        speech,
        GLOBALS.MESSAGE_BUTTONS,
        GLOBALS.STR_BOT,
        GLOBALS.STR_USER,
        context,
        intent,
        selectActionOptions
      )
    );
  }

  private fillContraryData (context, botResponse) {
    const { paramsRespose, speech, contexts, intent } = botResponse;
    const mapper = CONTRARY_DATA_MAPPER[context]
    const { from, to } = mapper;
    this.parte.contrario[to] = paramsRespose[from];

    this.messages.addMessage(
      new Message(
        speech,
        GLOBALS.MESSAGE_TEXT,
        GLOBALS.STR_BOT,
        GLOBALS.STR_USER,
        contexts[0],
        intent
      )
    );
  }

  private getDatosContrarioMedianteMatricula(): void {
    this.externals.getDatosParte(this.parte.contrario.matricula).subscribe((response: any) => {
      console.log('getDatosParte', response)
      if (response.status === 200) { // if response 204 no found data
        this.parte.updateDatosContrario(response.body);
      }
    }, (error) => { console.log(error)});
  }

  private updateDriverData(params) {
    this.parte.asegurado.nombre = this.parte.asegurado.nombre || params.firstName
    this.parte.asegurado.apellidos = this.parte.asegurado.apellidos || params.lastName
    this.parte.asegurado.dni = this.parte.asegurado.dni || params.DNI
  }
}
