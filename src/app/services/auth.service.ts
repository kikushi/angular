import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { promise } from 'protractor';
import { stringify } from 'querystring';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  createNewUser(email:string,password:string){
    return new Promise((resolve,reject)=>{
      firebase.auth().createUserWithEmailAndPassword(email,password).then(()=>{
        resolve();
      },
      )

    })
  

  }
  signInUser(email:string,password:string){
    return new Promise((resolve,reject)=>{
      firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{resolve()
      })
    })

  }
  signOutUser(){
    firebase.auth().signOut();
  }
}
