import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IUserRegisto, UserRegisto} from './userRegisto';
import {IUser, User} from '../login/user';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.css']
})
export class RegistoComponent implements OnInit {


  user: IUserRegisto = new UserRegisto();
  confirmarPassword = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {

  }



  onSubmit():void{

  }

  registo():void{

  }

}
