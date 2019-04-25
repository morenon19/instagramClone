import { Component, OnInit } from '@angular/core';
import { Autenticacao } from './autenticacao.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'instagramClone';

  ngOnInit():void{

    var config = {
      apiKey: "AIzaSyBCZrXX3Yyg0CTZ88xlDtUw7_lA3ouonR0",
      authDomain: "jta-instagram-clone-2e88f.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-2e88f.firebaseio.com",
      projectId: "jta-instagram-clone-2e88f",
      storageBucket: "jta-instagram-clone-2e88f.appspot.com",
      messagingSenderId: "747696573242"
    };
  
    firebase.initializeApp(config)
  }

}
