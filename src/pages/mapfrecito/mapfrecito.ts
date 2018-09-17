import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef
} from '@angular/core';
import { IonicPage, Content, Grid, NavController, NavParams } from 'ionic-angular';
import { Message } from 'app/classes/Message';
import { ContextGateController } from 'services/context-gate-controller.service';
import { MessagesService } from 'services/messages.service';
import { ParteService } from 'services/parte.service';
import { Insured } from 'app/classes/Insured';
import { FormularioPage } from 'pages/formulario/formulario';
import { ExternalsService } from 'services/externals.service';

//plugin
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech,TTSOptions } from '@ionic-native/text-to-speech';


const isContraryIntent: string[] = [
  'CollectData',
  'CarRegistrationContrary',
  'CollectDataContrary'
];
const isDriverIntent: string[] = [
  'YesAccidentReport',
];

@IonicPage({
  name: 'mapfrecito',
  segment: 'chat'
})
@Component({
  selector: 'page-mapfrecito',
  templateUrl: 'mapfrecito.html'
})
export class MapfrecitoPage implements OnInit, AfterViewChecked {

  @ViewChild(Content) content: Content;
  @ViewChild(Grid, { read: ElementRef }) messageFeedNode: ElementRef;

  //TODO: implement input lock when last message context asks for photo
  public messageFeed: Message[] = [];
  public lastMsg: string;
  public bloquear: boolean = false;
  private messageFeedChangeObserver: MutationObserver;
  public usuarioRegistrado: any = this.navParams.get('name');
  private once: boolean = false;
  public msgVoice: string;//prueba
  public textToSay: string;//prueba
  private cd: ChangeDetectorRef

  constructor(
    private navParams: NavParams,
    private navController: NavController,
    private gate: ContextGateController,
    private messages: MessagesService,
    private external: ExternalsService,
    private parte: ParteService,
    public ref: ChangeDetectorRef,
    private speechRecognition: SpeechRecognition,
    private textToSpeech: TextToSpeech
  ) {
    this.messages.getMessageListObserver().subscribe((messages: Message[]) => {
      this.messageFeed = messages;
    });
    this.gate.hasFinished().subscribe((finished) => {
      if (finished) {
        this.goToParte();
      }
    });
    // this.messages.addMessage(new Message('hi', 'phone_form', 'bot', 'user', undefined));
  }

  ngAfterViewChecked () {
    this.scrollToBottom();
  }


  public blockInput(event: any) {
    if (this.bloquear !== event.lock) {
      this.bloquear = event.lock;
      this.ref.detectChanges();
    }
  }

  private ionViewWillEnter() {
    if (!this.once) {

      console.log(this.usuarioRegistrado);
      //This is the app enter point, so the service should not have any data set
      this.parte.asegurado.nombre = this.usuarioRegistrado;
      this.gate.sendLoginAsegurado(this.usuarioRegistrado || 'conductor/a');
      this.once = true;
    }
  }

  ngOnInit() {
    this.messageFeedChangeObserver = new MutationObserver((mutations) => {
      //console.log('ngOnInit messageFeedChangeObserver in  ', this.messages[0].msgBody, mutations )//prueba
      this.scrollToBottom()
      //console.log('ngOnInit messageFeedChangeObserver out  ', this.messages[0].msgBody, mutations)//prueba
    });

    this.messageFeedChangeObserver.observe(this.messageFeedNode.nativeElement, {
      childList: true
    });

    this.external.getDatosAsegurado().subscribe((response: any) => {

      this.parte.asegurado.telefono = response.telefono;
      this.parte.asegurado.cp = response.cp;
      this.parte.asegurado.poliza = response.poliza;
      this.parte.asegurado.d_prop_asegurados = response.d_prop_asegurados;
      this.parte.asegurado.c_verde_val = response.c_verde_val;
      this.parte.asegurado.c_verde = response.c_verde;
      this.parte.asegurado.localidad = response.localidad;
      this.parte.asegurado.apellidos = response.apellidos;
      this.parte.asegurado.direccion = response.direccion;
      this.parte.asegurado.matricula = response.matricula;
      this.parte.asegurado.agencia = response.agencia;
      this.parte.asegurado.marca = response.marca;
      this.parte.asegurado.recuperar_iva = response.recuperar_iva;

      console.log('Asegurado: ');
      console.log(this.parte.asegurado);

    });

    //prueba
    this.speechRecognition.hasPermission().then((hasPermission:boolean) => {
        if(!hasPermission){
          this.speechRecognition.requestPermission()
            .then(
              () => console.log('Granted'),
              () => console.log('Denied')
            )
        }
    });

  }

  //prueba
  public startRecognition() {
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          //this.gate.sendVisibleMessage(matches[0]) //PRUEBA muestra directamente en el mensaje
          this.msgVoice = matches[0]; // PRUEBA para que lo muetre en el campo de texto
          this.cd.detectChanges();
          this.enviarMensajeVoz();// PRUEBA para que lo muetre en el campo de texto
          //this.enviarMensajeVoz(this.msgVoice);// PRUEBA para que lo muetre en el campo de texto
        }
      )
  };

  //prueba
  public enviarMensajeVoz() {
    if (this.msgVoice && this.msgVoice != '') {

      this.gate.sendVisibleMessage(this.msgVoice);
    
      // Workaroud, replace it when find another solution
       setTimeout(() => {
         this.msgVoice = null;
       }, 1);
    }
  }

  private goToParte() {
    this.navController.push('Formulario');
  }

  /**
   * This method uses de template-binded variable 'lastMsg' in order to send query to DialogFlow API
   */
  public enviarMensaje() {
    if (this.lastMsg && this.lastMsg != '') {
      console.log("1")//prueba
      this.gate.sendVisibleMessage(this.lastMsg);
      // Workaroud, replace it when find another solution
      setTimeout(() => {
        this.lastMsg = null;
      }, 1);
    }
  }


  public scrollToBottom() {
    this.content.scrollToBottom(300);
  }

  private isCollectContraryData(intentName): boolean {
    return isContraryIntent.some((intent) => intent === intentName);
  }

  private isCollectDriverData(intentName): boolean {
    return isDriverIntent.some((intent) => intent === intentName);
  }
}
