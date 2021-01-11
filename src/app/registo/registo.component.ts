import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IUserRegisto, UserRegisto} from './userRegisto';
import firebase from 'firebase';

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



  registoStore() : void {

    if (this.user.email != null && this.user.password != null) {
      firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then((user) => {

        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

        });
    }
  }

  onSubmit():void{

  }

  registo():void{

  }

}
