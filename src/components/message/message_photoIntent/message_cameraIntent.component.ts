import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'app/classes/Message';
import { Camera, CameraOptions } from '@ionic-native/camera';
//---------------------------------
import { ToastController } from 'ionic-angular';
import { MapfreService } from 'services/mapfre.service';
import { ExternalsService } from 'services/externals.service';
import { ParteService } from 'services/parte.service';
import { ContextGateController } from 'services/context-gate-controller.service';
import { BaseMessageWithToast } from 'app/classes/BaseMessageWithToast';




@Component({
  selector: 'message-camera-intent',
  host: {
    class: 'message-camera-intent'
  },
  templateUrl: 'message_cameraIntent.template.html'
})
export class MessageCameraIntentComponent extends BaseMessageWithToast implements OnInit {

  @ViewChild('videoOutput') videoOut: ElementRef;

  @Input() public message: Message;
  // 0 for CAMERA, 1 for VIDEO or any for both **** NOT YET IMPLEMENTED *****
  @Input() public intentType: number;

  public imgRetrieved: boolean = false;
  public isAllDone: boolean = false;

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
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE
  };

  public base64ImagesString: string[];

  constructor(
    private camera: Camera,
    private mapfre: MapfreService,
    public toast: ToastController,
    private externals: ExternalsService,
    private parte: ParteService,
    private gate: ContextGateController) {
    super(toast);
    this.base64ImagesString = []
  }

  sendImage() {
    this.parte.base64_accidentes = this.base64ImagesString;
    this.isAllDone = true;
    this.gate.sendInvisibleMessage(this.parte.getCapturaFinalizada());
    this.presentToast('Imagen Enviada...', 'bottom', 1000);
    this.toggleLock();
    this.blockInput.complete();
  }

  public getImage() {
    //Camera.getPicture returns a Promise, so should implement success and error cb functionsz
    console.log('Getting Photo 2');
    this.camera.getPicture(this.default_camera_options).then((imageData) => {
      // data is base64:
      this.base64ImagesString.push(imageData + '');
      this.imgRetrieved = true;
    }, (err) => {
      this.presentToast(`Some error ocurred: ${err.m}`, 'top', 3000);
    });
  }

  ngOnInit(): void {
    this.toggleLock();
  }

  private hasMoreThanOnePhoto(): boolean {
    return this.base64ImagesString.length > 1;
  }
}
