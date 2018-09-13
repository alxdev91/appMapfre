import { Component, Input, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Message } from 'app/classes/Message';
//---------------------------------
import { ToastController } from 'ionic-angular';
import { CaptureError, MediaCapture, CaptureVideoOptions, MediaFile } from '@ionic-native/media-capture';
import { File } from '@ionic-native/file';
import { MapfreService } from 'services/mapfre.service';
import { ExternalsService } from 'services/externals.service';
import { ParteService } from 'services/parte.service';
import { ContextGateController } from 'services/context-gate-controller.service';
import { BaseMessageWithToast } from 'app/classes/BaseMessageWithToast';

/**
 * Generated class for the MessageVideoIntentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'message-video-intent',
  templateUrl: 'message-video-intent.template.html'
})
export class MessageVideoIntentComponent extends BaseMessageWithToast implements OnInit {

  @ViewChildren('videoOutput') videoOuts: QueryList<any>;

  @Input() public message: Message;

  private fileName: string;
  private filePath: string;
  private isAllDone: boolean = false;
  private playing: boolean = false;
  private recording: boolean = false;
  public videoRetrieved: boolean = false;
  private fileURL: string;
  private urlVideoAccidente: string;

  private mediaFile:MediaFile[];

  constructor(
    public toast:ToastController,
    private mediaCapture: MediaCapture,
    private file: File,
    private gate:ContextGateController,
    private parte:ParteService,
    private mapfre: MapfreService,
    private externals: ExternalsService
  ) {
    super(toast);
  }

  ngOnInit(): void {
    this.toggleLock();
  }

  ngAfterViewInit(): void {
    this.videoOuts.changes.subscribe(videos => {
      if (this.fileName) {
        videos.toArray().forEach(element => {
          // For mock work
          const dataDirectory = this.file.dataDirectory || 'assets/Camera/';
          let path = dataDirectory + this.fileName;
          this.urlVideoAccidente = path.replace(/^file:\/\//, '');
          let video = element.nativeElement;
          video.src = this.urlVideoAccidente;
        });
      }
    });
  }

  public getVideo() {
    this.recording = true;
    this.mediaCapture.captureVideo().then((data: MediaFile[]) => {
      this.mediaFile = data;
      let capturedFile = this.mediaFile[0];
      this.fileName = capturedFile.name;
      let dir = capturedFile['localURL'].split('/');
      dir.pop();
      let fromDirectory = dir.join('/');
      this.filePath = this.file.dataDirectory;

      this.file.copyFile(fromDirectory , this.fileName , this.filePath , this.fileName).then((res) => {
        this.recording = false;
        this.videoRetrieved = true;
      },err => {
        console.log('err: ', err);
      });
          },
    (err: CaptureError) => console.error(err));
  }

  public repeatVideo(){
    this.videoRetrieved = false;
  }

  sendVideo() {
    // this.parte.url_videoAccidente = this.fileURL;
    // this.parte.path_videoAccidente = this.filePath;
    this.isAllDone = true;
    this.toggleLock();
    this.blockInput.complete();
    this.parte.urlVideoAccidente = this.urlVideoAccidente;
    this.gate.sendInvisibleMessage(this.parte.getCapturaFinalizada());
    this.presentToast('Video Enviado...', 'bottom' ,1000);
  }
}
