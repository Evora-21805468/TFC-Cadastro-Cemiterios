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

}
