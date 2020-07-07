import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';
  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyDiiyqA4_Y6jsKk2BlO_vgbInOvAUfoRrw",
      authDomain: "projet-intranet-bf109.firebaseapp.com",
      databaseURL: "https://projet-intranet-bf109.firebaseio.com",
      projectId: "projet-intranet-bf109",
      storageBucket: "projet-intranet-bf109.appspot.com",
      messagingSenderId: "492398656031",
      appId: "1:492398656031:web:de4c7b857ccfee885cb32a",
      measurementId: "G-B70JZJ2F51"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
