import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Devices} from '../../app/models/devices';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject,AngularFireList } from 'angularfire2/database'
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Device_loc} from '../../app/models/gpsloc';
import  firebase from 'firebase';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the PreviousTracksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-previous-tracks',
  templateUrl: 'previous-tracks.html',
})
export class PreviousTracksPage {
    public GpsLng: any;
    public GpsLat: any;
    @ViewChild('map') mapRef:ElementRef;
    currentMapTrack = null;
    map: any;

 
    isTracking = false;
    trackedRoute = [];
    previousTracks = [];
    positionSubscription: Subscription;
  
    currentUserId:any;
    public deviceId ={};
    public GpsLatLng ;
    constructor( 
        public loadingCtrl: LoadingController, 
        private afAuth: AngularFireAuth,  
        private plt: Platform, 
        private afDatabase: AngularFireDatabase, 
        public navCtrl: NavController,
        private geolocation: Geolocation, 
        public navParams: NavParams,
        private storage: Storage) {
    }
  //ionViewWillEnter	will make the page reload if you 
  //leave page and come back again
  
  ionViewWillEnter() {
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
                this.GpsLat = gps_devicesSnapshot.val().Latitude;
                this.GpsLng = gps_devicesSnapshot.val().Longitude;
                console.log('test, "String"')
                console.log('Location Coordinate lat',this.GpsLat);
                console.log('Location Coordinate lng',this.GpsLng);
              
  
                //map location variable
                const location = new google.maps.LatLng(this.GpsLat,this.GpsLng);
  
                //map options object
                let options= {
                  center:location,
                  zoom:10,
                  streetViewControl: false,
                  mapTypeId: 'roadmap'
                };
                //load the map
                 this.map =new google.maps.Map(this.mapRef.nativeElement,options);
                //point current location
                this.addMarker (location,Map);
  
                loader.dismiss(); // dismiss loader after the map is done loading                
  
              })        
            })
          }); 
  
      }
  
      ///Location marker function
      addMarker(position,map) {
        return new google.maps.Marker({
          position,
          map
        });
      }      
    
    
  }
