import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    firebase.initializeApp(environment.firebaseConfig );
  }

}
