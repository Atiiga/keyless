import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular'
import { HomePage } from '../home/home';
import { TrackPage } from '../track/track';
import { ConnectPage } from '../connect/connect';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TrackPage;
  tab3Root = ConnectPage;


  constructor(
    private toast: ToastController,
    private afAuth: AngularFireAuth) {

  }
  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {if(data.email && data.uid){
      this.toast.create({
//    message: 'Welcome to Keylesss,  ${data.email}',
      //  duration: 5000
      }).present();
    }else{
      this.toast.create({
        message: 'Could not find authenticating detial',
        duration: 5000
      }).present();
    }
    });

  }
}
