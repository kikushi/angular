import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { promise } from 'protractor';
import { stringify } from 'querystring';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }
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
        this.router.navigate(['/products']);
      })
    })
    

  }
  signOutUser(){
    firebase.auth().signOut();
  }
}
