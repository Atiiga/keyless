import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Devices} from '../../app/models/devices';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject,AngularFireList } from 'angularfire2/database'
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { GoogleMap, Environment, GoogleMaps } from '@ionic-native/google-maps';
import { Device_loc} from '../../app/models/gpsloc';
import { auth } from 'firebase';
import firebase from 'firebase';


declare var google: any;


@IonicPage()
@Component({
  selector: 'page-track',
  templateUrl: 'track.html',
})
export class TrackPage {
  public GpsLng: any;
  public GpsLat: any;
  @ViewChild('map') mapRef:ElementRef;
  currentUserId:any;
  public deviceId ={};
  public GpsLatLng ;
  constructor( 
      public loadingCtrl: LoadingController, 
      private afAuth: AngularFireAuth,  
      private plt: Platform, 
      private afDatabase: AngularFireDatabase, 
      public navCtrl: NavController, 
      public navParams: NavParams) {
  }

ionViewDidLoad() {
  this.plt.ready().then(()=>{
      this.DisplayMap();
  });
    }

    DisplayMap() {
      var loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
         //gets id of current user
         this.afAuth.authState.subscribe((auth)=>{
          this.currentUserId =auth.uid;
          console.log( 'Current user', this.currentUserId);
          //get Device id
          const deviceidRef: firebase.database.Reference = firebase.database().ref(`/devices/${this.currentUserId}`);
          deviceidRef.on(`value`, devicesSnapShot =>{
            this.deviceId = devicesSnapShot.val().device_id;
            console.log('device id',this.deviceId);
            //Read the Location Coordinate
            const GpsDataRef: firebase.database.Reference = firebase.database().ref(`/gps_devices/${this.deviceId}`);
            GpsDataRef.on(`value`, gps_devicesSnapshot =>{
              this.GpsLat = gps_devicesSnapshot.val().Latitute;
              this.GpsLng = gps_devicesSnapshot.val().Longitute;
              console.log('test, "String"')
              console.log('Location Coordinate lat',this.GpsLat);
              console.log('Location Coordinate lng',this.GpsLng);
            


              let location = new google.maps.LatLng(this.GpsLat,this.GpsLng);

              let options= {
                center:location,
                zoom:10,
                streetViewControl:false,
                mapTypeId: 'hybrid'
              };
              //load the map
              let map =new google.maps.Map(this.mapRef.nativeElement,options);
              //point current location
              this.addMarker (location,map);

              loader.dismiss();              
            })        
          })
        }); 

    }
    addMarker(position,map) {
      return new google.maps.Marker({
        position,
        map
      });
    }
}
