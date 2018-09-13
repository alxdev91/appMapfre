import { Component } from '@angular/core';
import { IonicPage, Content, Grid, NavController, NavParams, AlertController } from 'ionic-angular';
import { FacialIdentificationService } from 'services/facial-identification.service';
import { StoreService } from 'services/store.service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@IonicPage({
  name: 'Register',
  segment: 'register'
})
@Component({
  selector: 'register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private user: string;

  constructor(
    private navCtrl: NavController,
    private facialIdentificationService: FacialIdentificationService,
    private storeService: StoreService,
    private alertCtrl: AlertController) {
  }

  onRegister () {
    const user = this.user && this.user.trim();
    if (!user) {
      return false;
    }
    this.facialIdentificationService.registerUser().subscribe((face) => {
      console.log('template', face);
      const payload = {
        user: this.user,
        feats: face
      };
      this.storeService.registerUser(payload).subscribe((response) => {
          this.showAlert(response);
      }, (error) => {
        this.showAlert({ status: 'KO'});
      });
    }, (error) => {
      alert(error);
    });
  }

  private showAlert(response) {
    const isOk = response.status === 'OK';
    let title;
    let subTitle;
    if (isOk) {
      title = 'Enhorabuena!!';
      subTitle = `${this.user} se ha registrado correctamente.`;
    }
    if (response.status === 'KO') {
      title = 'Ups!!';
      subTitle = 'Servicio temporalmente no disponible.';
      if (response.code === 0) {
        subTitle = `Ha ocurrido un error a la hora de registrarse con el usuario ${this.user}`;
      } else if(response.code === 11) {
        subTitle = `El usuario ${this.user} ya existe`;
      } else if(response.code === 12) {
        subTitle = `El usuario no puede estar vacio`;
      }
    }
    const alert = this.alertCtrl.create({
      title,
      subTitle,
      buttons: ['Aceptar']
    });
    alert.present();
    if (isOk) {
      this.navCtrl.setRoot('Index');
    }
  }

}
