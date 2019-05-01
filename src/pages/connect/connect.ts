import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController, ToastController } from 'ionic-angular';import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConnectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html',
})
export class ConnectPage {
  pairedList: pairedlist;
  listToggle: boolean = false;
  pairedDeviceID: number = 0;
  dataSend: string = "";
  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController, 
   private bluetoothSerial: BluetoothSerial, 
    private toastCtrl: ToastController) {
    this.checkBluetoothEnabled();
 }
 checkBluetoothEnabled() {
  this.bluetoothSerial.isEnabled().then(success => {
    this.listPairedDevices();
  }, error => {
    this.showError("Please Enable Bluetooth")
  });
}

listPairedDevices() {
  this.bluetoothSerial.list().then(success => {
    this.pairedList = success;
    this.listToggle = true;
  }, error => {
   this.showError("Please Enable Bluetooth")
    this.listToggle = false;
  });
}


selectDevice() {
  let connectedDevice = this.pairedList[this.pairedDeviceID];
  if (!connectedDevice.address) {
    this.showError('Select Paired Device to connect');
    return;
  }
  let address = connectedDevice.address;
  let name = connectedDevice.name;

  this.connect(address);
}

connect(address) {
  // Attempt to connect device with specified address, call app.deviceConnected if success
  this.bluetoothSerial.connect(address).subscribe(success => {
    this.deviceConnected();
    this.showToast("Successfully Connected");
  }, error => {
    this.showError("Error:Connecting to Device");
  });
}

deviceConnected() {
  // Subscribe to data receiving as soon as the delimiter is read
  this.bluetoothSerial.subscribe('').subscribe(success => {
    this.showToast("Connected Successfullly");
  }, error => {
    this.showError(error);
  });
}

deviceDisconnected() {
  // Unsubscribe from data receiving
  this.bluetoothSerial.disconnect();
  this.showToast("Device Disconnected");
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
showToast(msj) {
  const toast = this.toastCtrl.create({
    message: msj,
    duration: 1000
  });
  toast.present();

}

}
interface pairedlist {
  "class": number,
  "id": string,
  "address": string,
  "name": string
}




