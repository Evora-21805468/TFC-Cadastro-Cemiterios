import { Component, OnInit } from '@angular/core';

import {IUser, User} from './user';
import {AuthService} from './auth.service';
import firebase from 'firebase';
import {environment} from '../../environments/environment';
import {SharedAuth} from './SharedAuth'
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser = new User();



  constructor(private authService: AuthService,public ls: SharedAuth) { }

  ngOnInit(): void {

  }

  login(): void{
    this.ls.setGlobalVar(false)
    this.authService.login(this.user);
  }

 recup(){
   var auth = firebase.auth();
   var emailAddress = "martimmourao@gmail.com";

   auth.sendPasswordResetEmail(emailAddress).then(function() {
     // Email sent.
   }).catch(function(error) {
     // An error happened.
   });
 }
}
