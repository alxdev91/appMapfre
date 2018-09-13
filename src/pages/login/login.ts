import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParteService } from 'services/parte.service';
import { MessagesService } from 'services/messages.service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'Login',
  segment: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  public pw = '';
  public nombreUsuario = '';

  public jsonUser = {

    name: ''

  };


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private parte: ParteService,
    private messages: MessagesService,
    private alert: AlertController) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.nombreUsuario = '';
    this.pw = '';
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

  irChatLoggeado() {
    const name = this.nombreUsuario && this.nombreUsuario.trim();
    const password = this.pw && this.pw.trim();
    if (!this.nombreUsuario || !this.pw) {
      return false;
    }
    this.messages.reset();
    this.jsonUser.name = this.nombreUsuario;
    console.log(this.jsonUser);
    this.navCtrl.push('Mapfrecito', this.jsonUser);
  }
}
