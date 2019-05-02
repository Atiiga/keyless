import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController, ToastController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import {AngularFireAuth } from "angularfire2/auth"


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private fireAuth: AngularFireAuth, 
              private bluetoothSerial: BluetoothSerial, 
              private toastCtrl: ToastController) {

  }

    // Open door function
    openData() {
      this.bluetoothSerial.write('A').then(success => {
        this.showToastOpen(success);
      }, error => {
        this.showError(error)
      });
    }
  
    // Close door function
    closeData() {
      this.bluetoothSerial.write('C').then(success => {
        this.showToastClose(success);
      }, error => {
        this.showError(error)
      });
    }
    
    // Boot control function
    bootData() {
      this.bluetoothSerial.write('B').then(success => {
        this.showToastBoot(success);
      }, error => {
        this.showError(error)
      });
    }
  
    //Error function
    showError(error) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: error,
        buttons: ['Dismiss']
      });
      alert.present();
    }
    
    //Toast Function
    showToastOpen(msj) {
      const toast = this.toastCtrl.create({
        message: 'Doors Open',
        duration: 3000
      });
      toast.present();
  
  }
      //Toast Function
      showToastClose(msj) {
        const toast = this.toastCtrl.create({
          message: 'Doors locked',
          duration: 3000
        });
        toast.present();
    
    }
        //Toast Function
        showToastBoot(msj) {
          const toast = this.toastCtrl.create({
            message: 'Boot Opened',
            duration: 3000
          });
          toast.present();
      
      }

      SignOut(user){
        this.fireAuth.auth.signOut();
      }


}
