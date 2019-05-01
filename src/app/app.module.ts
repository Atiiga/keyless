import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMap, Environment, GoogleMaps,   GoogleMapsEvent, Marker, GoogleMapsAnimation, MyLocation } from '@ionic-native/google-maps';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage} from '../pages/login/login'
import { RegisterPage} from '../pages/register/register'
import { TrackPage } from '../pages/track/track';
import { ConnectPage } from '../pages/connect/connect';
import * as firebase from 'firebase' 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AngularFireModule} from "angularfire2";
import { FIREBASE_CONFIG } from './app.firebase.config';
import { RegisterPageModule } from '../pages/register/register.module';
import { LoginPageModule } from '../pages/login/login.module';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { UsersserviceProvider } from '../providers/usersservice/usersservice';
import { HttpModule } from '@angular/http';


// Initialize Firebase
export const config = {
    apiKey: "AIzaSyAhXrJGE8Xdh_jT8PRF0hld4o0dsTIRdNo",
    authDomain: "keyless-f343e.firebaseapp.com",
    databaseURL: "https://keyless-f343e.firebaseio.com",
    projectId: "keyless-f343e",
    storageBucket: "keyless-f343e.appspot.com",
    messagingSenderId: "230189687181"
};
firebase.initializeApp(config);



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TrackPage,
    LoginPage,
    RegisterPage,
    ConnectPage,
    TabsPage 
  ],
  imports: [
    BrowserModule,
    //LoginPageModule,
    //RegisterPageModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TrackPage,
    ConnectPage,
    TabsPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    BluetoothSerial,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersserviceProvider
    
  ]
})
export class AppModule {}
