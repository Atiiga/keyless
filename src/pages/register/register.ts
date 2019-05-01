import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import {AngularFireAuth } from "angularfire2/auth"
import { LoginPage } from '../login/login';
import { AngularFireDatabase } from 'angularfire2/database';
import { auth } from 'firebase';
import { TabsPage } from '../tabs/tabs';
import * as firebase from 'firebase';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [UsersserviceProvider]

})
export class RegisterPage {

  public first_name : string;
  public last_name : string;
  public username : string;
  public email : string;
  public phone : string;
  public password : any;
  public device_id: string;
  public car_type: string


  constructor(
    public toastCtrl: ToastController, 
    public loadingCtrl: LoadingController,
    public usersserviceProvider : UsersserviceProvider, 

    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams
    ) {
  }



  Signup(){

    var   account = {
      first_name: this.first_name,
      last_name: this.last_name || '',
      username: this.username || '',
      email: this.email,
      car_type: this.car_type,
      phone: this.phone || '',
      password: this.password,
    };
    var devives ={
      device_id: this.device_id,
    }
    var that = this;

    var loader = this.loadingCtrl.create({
      content: "Please wait...",
      
    });
    loader.present();


  	this.usersserviceProvider.signupUserService(account, devives).then(authData => {
  		//successful
  		loader.dismiss();
  		that.navCtrl.setRoot(TabsPage);

  	}, error => {
loader.dismiss();
     // Unable to log in
      let toast = this.toastCtrl.create({
        message: error,
        duration: 3000,
        position: 'top'
      });
      toast.present();

      that.password = ""//empty the password field

  	});

    
  }


}
