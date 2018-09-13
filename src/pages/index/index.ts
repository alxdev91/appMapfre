import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { ParteService } from 'services/parte.service';
import { MessagesService } from 'services/messages.service';

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private parte: ParteService,
    private messages: MessagesService,
    public actionsheetCtrl: ActionSheetController,
    private alert: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    if (this.parte.parteEnviado) {
      this.showConfirm();
    }
  }

  showConfirm() {
    let confirm = this.alert.create({
      title: `REF : ${Math.floor((Math.random() * 12343546) + 1)}`,
      message: `Estimado ${this.parte.asegurado.nombre}, le informamos del número de referencia con el que se ha registrado su expediente \n GRACIAS POR CONFIAR EN NEO-COVER`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.parte.reset();
            this.messages.reset();
          }
        }
      ]
    });
    confirm.present();
  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Iniciar sesión',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Usuario/Contraseña',
          icon: 'log-in',
          handler: () => {
            this.navCtrl.push('Login');
          }
        },
        {
          text: 'Facial',
          icon: 'person',
          handler: () => {
            this.navCtrl.push('FacialLogin');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
