import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from 'app/classes/Message';
import { NavController, Platform, ToastController } from 'ionic-angular';
import { CaptureError, MediaCapture } from '@ionic-native/media-capture';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media';
import { ParteService } from 'services/parte.service';
import { ContextGateController } from 'services/context-gate-controller.service';
import { BaseMessageWithToast } from 'app/classes/BaseMessageWithToast';

const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'message-audio-intent',
  templateUrl: 'message-audio-intent.template.html'
})

export class MessageAudioIntentComponent extends BaseMessageWithToast implements OnInit {
  mediaFiles = [];
  @Input() public message: Message;

  private fileName: string;
  private filePath: string;
  private mediaObject: MediaObject;
  private isAllDone: boolean = false;
  private playing: boolean = false;
  private recording: boolean = false;
  private audioRetrieved: boolean = false;
  private fileURL: string;

  constructor(public toast: ToastController,
    private platform: Platform,
    private mediaCapture: MediaCapture,
    private storage: Storage,
    private file: File,
    private media: Media,
    private gate: ContextGateController,
    private parte: ParteService) {
      super(toast);
    }

  public startRecord() {
    if (this.platform.is('ios')) {
      this.fileName = 'observacion' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.m4a';
      this.filePath = this.file.documentsDirectory.replace(/^file:\/\//, '') + this.fileName;
      this.mediaObject = this.media.create(this.filePath);
    } else if (this.platform.is('android') || this.platform.is('core')) {
      this.fileName = 'observacion' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
      this.filePath = this.file.externalDataDirectory + this.fileName;
      this.mediaObject = this.media.create(this.filePath);
    }
    this.mediaObject.startRecord();
    if (!this.platform.is('core')) {
      this.file.resolveLocalFilesystemUrl(this.filePath).then((onfullfilled) => {
        this.fileURL = onfullfilled.toURL();
      });
    }
    this.recording = true;
  }

  public stopRecord() {
    console.log('Fin');
    this.audioRetrieved = true;
    this.mediaObject.stopRecord();
    this.recording = false;
  }

  playAudio() {
    this.mediaObject.seekTo(0);
    this.mediaObject.play();
    this.playing = true;
    this.mediaObject.setVolume(0.8);
  }
  stopAudio() {
    this.mediaObject.stop();
    this.playing = false;
  }

  public repetirAudio() {
    this.audioRetrieved = false;
  }

  sendAudio() {
    this.parte.audioFileName = this.fileName;
    this.parte.url_audioAccidente = this.fileURL;
    this.parte.path_audioAccidente = this.filePath;
    this.isAllDone = true;
    this.toggleLock();
    this.blockInput.complete();
    this.presentToast('Audio Enviado...', 'bottom', 1000);
    this.gate.sendInvisibleMessage(this.parte.getAudioFinalizado());
  }

  ngOnInit(): void {
    this.toggleLock();
  }
}
