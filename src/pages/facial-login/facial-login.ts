import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FacialIdentificationService } from 'services/facial-identification.service';
import { MessagesService } from 'services/messages.service';
import { StoreService } from 'services/store.service';

/**
 * Generated class for the FacialLoginPage page.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@IonicPage({
  name: 'FacialLogin',
  segment: 'facial-login'
})
@Component({
  selector: 'facial-login',
  templateUrl: 'facial-login.html'
})

export class FacialLoginPage {

  public pw: string = '';
  public nombreUsuario: string = '';

  public jsonUser = {
    name: ''
  };


  constructor(
    public navCtrl: NavController,
    private messages: MessagesService,
    private facialIdentificationService: FacialIdentificationService,
    private storeService: StoreService,
    private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.nombreUsuario = '';
    this.pw = '';
  }

  loginFacial() {
    const user = this.nombreUsuario && this.nombreUsuario.trim();
    if (!user) {
      return false;
    }
    this.facialIdentificationService.authenticateUser().subscribe((face) => {
      const payload = {
        user: this.nombreUsuario,
        feats: face
      };
      this.storeService.authenticateUser(payload).subscribe((response) => {
        console.log('authenticateStatus', response);
        if (response.status === 'OK') {
          this.goToChat();
        } else if (response.status === 'KO') {
          let subTitle = `Lo siento, no eres ${this.nombreUsuario}.`;
          if (response.code === 14) {
            subTitle = `El usuario ${this.nombreUsuario} no esta registrado.`;
          } else if (response.code === 12) {
            subTitle = `El usuario no puede estar vacio`;
          }
          this.showAlert(subTitle);
        }
      }, (error) => {
        this.showAlert('Servicio temporalmente no disponible.');
      });
    }, (error) => {
      alert(error);
    });
  }

  private goToChat() {
    this.messages.reset();
    this.jsonUser.name = this.nombreUsuario;
    console.log(this.jsonUser);
    this.navCtrl.push('Mapfrecito', this.jsonUser);
  }

  private showAlert(subTitle) {
    const alert = this.alertCtrl.create({
      title: `Ups!!`,
      subTitle,
      buttons: ['Aceptar']
    });
    alert.present();
  }

}
