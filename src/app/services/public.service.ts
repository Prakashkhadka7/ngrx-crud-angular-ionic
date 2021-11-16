import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private toastCtrl: ToastController) { }


  async presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'top'
    });

    (await toast).onDidDismiss();

    (await toast).present();
  }
}
