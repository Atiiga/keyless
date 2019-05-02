import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase' 

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
 
  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public loadingCtrl: LoadingController, 
    public splashScreen: SplashScreen) {
      var loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
    this.initializeApp();
    firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        // User is signed in.
        this.rootPage = TabsPage;

      } else {
        // No user is signed in.
        this.rootPage = LoginPage;

      }
      loader.dismiss();

    });
 
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
