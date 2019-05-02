import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import {AngularFireAuth } from 'angularfire2/auth'
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage  } from '../register/register';
import * as firebase from 'firebase';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import { Account} from '../../app/models/account'


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UsersserviceProvider]

})
export class LoginPage {
  account ={} as Account;

  public email: string;
  public password: string;

  constructor(
    public usersService : UsersserviceProvider, 
    public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController,  
    public navCtrl: NavController, public navParams: NavParams) {

    
  }

  submitLogin(){

    var that = this;
    
    var loader = this.loadingCtrl.create({
          content: "Please wait..."
        });
        loader.present();
    
    
        this.usersService.loginUserService(this.email, this.password).then(authData => {
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

  forgotPassword(){

  }
  Signup(){

          this.navCtrl.push(RegisterPage);
  }
}
