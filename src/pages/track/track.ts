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
import { PreviousTracksPage } from '../previous-tracks/previous-tracks';


declare var google: any;


@IonicPage()
@Component({
  selector: 'page-track',
  templateUrl: 'track.html',
})
export class TrackPage {

  map: any;
  currentMapTrack = null;


  public GpsLng: any;
  public GpsLat: any;
  @ViewChild('map') mapRef:ElementRef;
  currentUserId:any;
  public deviceId ={};
  public GpsLatLng ;
  isViewRoute = false;
  Places = [];
  constructor( 
      public loadingCtrl: LoadingController, 
      private afAuth: AngularFireAuth,  
      private plt: Platform, 
      private afDatabase: AngularFireDatabase, 
      public navCtrl: NavController, 
      public navParams: NavParams) {
  }
//ionViewWillEnter	will make the page reload if you 
//leave page and come back again

ionViewDidEnter() {
  this.plt.ready().then(()=>{
      this.DisplayMap();
  });
    }

    DisplayMap() {

      //this make the user load that app is loading the map
      var loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 15000,
      });
      loader.present();//start loader
   
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
              this.GpsLat = parseFloat(gps_devicesSnapshot.val().Latitude);
              this.GpsLng = parseFloat(gps_devicesSnapshot.val().Longitude);
              console.log('test, "String"')
              console.log('Location Coordinate lat',this.GpsLat);
              console.log('Location Coordinate lng',this.GpsLng);
            

              //map location variable
              const location = new google.maps.LatLng(this.GpsLat,this.GpsLng);

              //map options object
              let options= {
                center:location,
                zoom:10,
                //streetViewControl:false,
                mapTypeId: 'roadmap'
              };
              //load the map
              this.map =new google.maps.Map(this.mapRef.nativeElement,options);
              //point current location
              this.addMarker (location,this.map);
              loader.dismiss(); // dismiss loader after the map is done loading            
            })        
          })
        }); 

    }
RecordedTrack(){
      this.navCtrl.push(PreviousTracksPage);
    }
    ///Location marker function
    addMarker(position,map) {
      return new google.maps.Marker({
        position,
        map
      });
    }

   PlacesCoords(){
          //this make the user load that app is loading the map
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 15000,
         });
    loader.present();//start loader
    this.afAuth.authState.subscribe((auth)=>{
      this.currentUserId =auth.uid;
      //get Device id
      const deviceidRef: firebase.database.Reference = firebase.database().ref(`/devices/${this.currentUserId}`);
      deviceidRef.on(`value`, devicesSnapShot =>{
      this.deviceId = devicesSnapShot.val().device_id;

      //get date
      const date = new Date()
      let day = date.getDate().toString();
      let month = (date.getMonth()+1).toString();
      let  year = date.getFullYear().toString();
      let hours = date.getHours().toLocaleString();
      let minutes = date.getMinutes().toLocaleString();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      let dateFormat = year + '-'+ month +'-' + day
        console.log(dateFormat);
        //reference to places coords
      const GpsDataRef: firebase.database.Reference = firebase.database().ref(`/gps_devices/${this.deviceId}/track/${dateFormat}`);
        GpsDataRef.on(`value`,DataSnapshot=>{
          this.Places = [];
          DataSnapshot.forEach(snap=>{
            this.Places.push({lat: parseFloat(snap.val().Latitude), lng: parseFloat(snap.val().Longitude)});
          });
          console.log(this.Places);
        });
      });
    });
   
    const Route = new google.maps.Polyline({
      path: this.Places,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 9
    });

     Route.setMap(this.map);
    loader.dismiss();//start loader

    return this.Places;   
  }

}

