import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Message } from 'app/classes/Message';
import { Camera, CameraOptions } from '@ionic-native/camera';
//---------------------------------
import { ToastController } from 'ionic-angular';
import { MapfreService } from 'services/mapfre.service';
import { CaptureVideoOptions, MediaCapture, MediaFile } from '@ionic-native/media-capture';
import { ExternalsService } from 'services/externals.service';
import { ParteService } from 'services/parte.service';
import { ContextGateController } from 'services/context-gate-controller.service';


@Component({
  selector: 'message-matricula-intent',
  host: {
    class: 'message-matricula-intent'
  },
  templateUrl: 'message_matriculaIntent.template.html'
})
export class MessageMatriculaIntentComponent {

  @Input() public message: Message;
  // 0 for CAMERA, 1 for VIDEO or any for both *** NOT YET IMPLEMENTED **
  @Input() public intentType: number;

  public imgRetrieved: boolean = false;
  public isAllDone: boolean = false;
  public matricula: string;

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
  private matriculaRetrieved: boolean;

  constructor(
    private camera: Camera,
    private mapfre: MapfreService,
    public toast: ToastController,
    private externals: ExternalsService,
    private parte: ParteService,
    private gate: ContextGateController) {

  }

  public presentToast(m: string, position: string, duration: number) {
    let toast = this.toast.create({
      message: m,
      duration: duration,
      position: position
    });

    toast.present();
  }

  saveImage() {
    if (this.intentType == 1) {
      this.parte.asegurado.matricula = this.matricula;
      this.parte.matricula_coche_asegurado = this.base64ImageString;
    } else {
      this.parte.contrario.matricula = this.matricula;
      this.parte.matricula_coche_contrario = this.base64ImageString;
    }
    this.isAllDone = true;
    this.gate.sendInvisibleMessage(this.matricula);
  }
  sendImage() {
    this.loading = true;
    this.externals.reconocerMatrícula(this.base64ImageString).subscribe((response: any) => {
      if (response.matricula) {
        console.log('matrícula: ' + response.matricula);

        this.matricula = response.matricula;
        this.matriculaRetrieved = true;
        this.isAllDone = false;
        this.loading = false;
      } else {
        this.presentToast('Ha habido un error desconocido reconociendo la matrícula de la foto, lo sentimos', 'bottom', 3000);
      }

    }, (error1) => {
      this.isAllDone = false;
      this.loading = false;
      this.matricula = undefined;
      this.matriculaRetrieved = false;
      this.presentToast('Ha habido un error reconociendo la matrícula de la foto, lo sentimos', 'bottom', 3000);
    });

  }

  public getImage() {
    //Camera.getPicture returns a Promise, so should implement success and error cb functions
    console.log('Getting Photo');
    this.matriculaRetrieved = false;
    this.camera.getPicture(this.default_camera_options).then((imageData) => {
      // data is base64:
      this.base64ImageString = imageData + '';
      this.imgRetrieved = true;
      this.sendImage();
    }, (err) => {
      this.presentToast(`Some error ocurred: ${err.m}`, 'top', 3000);
    });
  }
}
