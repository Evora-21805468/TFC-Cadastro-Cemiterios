import { Component, OnInit } from '@angular/core';

import {IUser, User} from './user';
import {AuthService} from './auth.service';
import firebase from 'firebase';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser = new User();



  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  login(): void{
    this.authService.login(this.user);
  }

  /*testPOST(): void{
    var resp;
    var http = new XMLHttpRequest();
    var url = 'https://services-eu1.arcgis.com/kJpwBKPhHXDuJncY/arcgis/rest/services/survey123_1278669bc6f64f089d84969cb31c3aa7/FeatureServer/survey/1';
    var params = 'f=json&token=phXDzxH6H4OZLVyH8yBfaJMVNol9WYcgHPg1ZFD8Zy1ON3GPzOVfXM0SvH0DyWz6rM4pBAZidR3pnr948LMa_YYJ4m15U0Wo-5n7PJS8H9sc5vfgtZ-H2yB6CSI_uoaa';
    http.open('POST', url, true);

  //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
        console.log(http.responseText);
      }
    }
    http.send(params);
    console.log("1")

  }*/
}
