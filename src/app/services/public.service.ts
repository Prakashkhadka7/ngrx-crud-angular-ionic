import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  isAddSection: boolean = true;
  constructor(private toastCtrl: ToastController,
  private alertCtrl: AlertController
  ) { }


  async presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'top'
    });

    (await toast).onDidDismiss();

    (await toast).present();
  }


async presentAlerts(message) {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: 'Alert',
    message: message,
    buttons: ['OK']
  });

  await alert.present();

  // const { role } = await alert.onDidDismiss();
}
}
