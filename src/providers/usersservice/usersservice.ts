import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
/*
  Generated class for the UsersserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersserviceProvider {

  public data: any;
  public fireAuth: any;
  public userProfile: any;
  public devives: any;
  constructor(public http: Http) {

 this.fireAuth = firebase.auth();
 this.userProfile = firebase.database().ref('users_info');
 this.devives = firebase.database().ref('devices');

  }


  loginUserService(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }


  signupUserService(account: {}, devices:{}){

        //signup user
        return this.fireAuth.createUserWithEmailAndPassword(account['email'], account['password']).then((newUser) => {
          //sign in the user
          this.fireAuth.signInWithEmailAndPassword(account['email'], account['password']).then((authenticatedUser) => {
            //successful login, create userinfo table
          this.userProfile.child(authenticatedUser.user.uid).set(account)
              //then devices table
            .then(this.devives.child(authenticatedUser.user.uid).set(devices))
          });
        });

  }



}
