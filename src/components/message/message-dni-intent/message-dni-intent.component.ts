import { Component, Input } from '@angular/core';
import { Message } from 'app/classes/Message';
import { Camera, CameraOptions } from '@ionic-native/camera';
//---------------------------------
import { ToastController } from 'ionic-angular';
import { MapfreService } from 'services/mapfre.service';
import { ExternalsService } from 'services/externals.service';
import { ParteService } from 'services/parte.service';
import { ContextGateController } from 'services/context-gate-controller.service';
import { BaseMessageWithToast } from 'app/classes/BaseMessageWithToast';
import * as tf from '@tensorflow/tfjs';//prueba

@Component({
  selector: 'message-dni-intent',
  host: {
    class: 'message-dni-intent'
  },
  templateUrl: 'message-dni-intent.template.html'
})
export class MessageDniIntentComponent extends BaseMessageWithToast {

  @Input() public message: Message;

  public imgRetrieved: boolean = false;
  public isAllDone: boolean = false;
  private nombre: string;
  private apellidos: string;
  private dni: string;

  //  destinationType values: --
  //  ------------------------
  // DATA_URL : 0, Return image as base64-encoded string
  // FILE_URI : 1, Return image file URI
  // NATIVE_URI : 2 Return image native URI (e.g., assets-library:// on iOS or content:// on Android)

  private default_camera_options: CameraOptions = {
    quality: 100,
    targetWidth: 720,
    targetHeight: 480,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  public base64ImageString: string;
  private loading: boolean = false;
  private dniRetrieved: boolean = false;
  private errorRetrieveDniData: boolean = false;

  constructor(
    private camera: Camera,
    private mapfre: MapfreService,
    public toast: ToastController,
    private externals: ExternalsService,
    private parte: ParteService,
    private gate: ContextGateController) {
      super(toast);
  }

  saveImage() {
    this.parte.contrario.nombre = this.nombre;
    this.parte.contrario.apellidos = this.apellidos;
    this.parte.contrario.dni = this.dni;
    this.parte.contraryDataFromCaptureImage = true;
    this.gate.sendInvisibleMessage(this.parte.getDatosContrario());
    this.isAllDone = true;
  }
  sendImage() {
    this.loading = true;
    this.externals.reconocerDni(this.base64ImageString).subscribe((response: any) => {
      console.log('reconocerDni' + response);
      if (response.codigoError === 10) { // No reconoce que la imagen es un dni
        this.errorRetrieveDniData = true;
      } else {
        if (response.data) {
          const { data: { nombre, apellidos, dni } } = response;
          this.nombre = nombre;
          this.apellidos = apellidos;
          this.dni = dni;
          this.dniRetrieved = true;
          this.isAllDone = false;
          this.loading = false;
        } else {
          this.presentToast('Ha habido un error desconocido reconociendo el dni de la foto, lo sentimos', 'bottom', 3000);
        }
      }
    }, (error1) => {
      this.isAllDone = false;
      this.loading = false;
      this.dniRetrieved = false;
      this.presentToast('Ha habido un error reconociendo el de la foto, lo sentimos', 'bottom', 3000);
    });

  }

  public getImage() {
    //Camera.getPicture returns a Promise, so should implement success and error cb functions
    console.log('Getting Photo 1');
    this.dniRetrieved = false;
    this.errorRetrieveDniData = false;
    this.camera.getPicture(this.default_camera_options).then((imageData) => {
      // data is base64:
      console.log("image data " + imageData);
      this.base64ImageString = imageData + '';
      this.imgRetrieved = true;
      this.sendImage();
    }, (err) => {
      this.presentToast(`Some error ocurred: ${err.m}`, 'top', 3000);
    });
  }
}
