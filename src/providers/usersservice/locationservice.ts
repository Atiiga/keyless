import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import {AngularFireAuth } from "angularfire2/auth"

export class Location {
    lat: string;
    lng: string;
 }

@Injectable()   
export class LocationService {

    devices: AngularFireList<Location>= null;
    userId: string;
  constructor(
      private afAuth: AngularFireAuth,
      private afDatabase: AngularFireDatabase) {
        this.afAuth.authState.subscribe(user=> {
            if(user) this.userId = user.uid
        })
  }
 getDeviceId(): AngularFireObject<Location[]>{
    if(!this.userId) return;
    this.devices = this.afDatabase.list(`devices/${this.userId}`);
    //return this.devices
 }
} 
