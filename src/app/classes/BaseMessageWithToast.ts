import { ToastController } from 'ionic-angular';
import { BaseMessage } from './BaseMessage';

export class BaseMessageWithToast extends BaseMessage {
  constructor(public toast: ToastController) {
    super();
   }

  public presentToast(m: string, position: string, duration: number) {
    let toast = this.toast.create({
      message: m,
      duration: duration,
      position: position
    });

    toast.present();
  }
}
