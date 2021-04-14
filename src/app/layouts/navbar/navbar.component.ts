import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from "@angular/fire/auth";
import {first} from "rxjs/operators";
import {FirebaseApp} from "@angular/fire";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(public router: Router, public angularAuth: AngularFireAuth, public firebase: FirebaseApp) { }

  ngOnInit(): void {
  }


   checkLogin(): boolean {
    if (this.router.url === '/login' || this.router.url === '/registo' || this.router.url === '/recuperacao') {
      return false;
    } else {
      return true;
    }
  }

  bye(): void{
    this.firebase.auth().signOut()
  }



}
