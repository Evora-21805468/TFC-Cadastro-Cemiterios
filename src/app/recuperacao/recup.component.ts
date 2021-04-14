import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import firebase from 'firebase';
import {AuthService} from '../login/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from "rxjs";
import {IUserRegisto, UserRegisto} from '../registo/userRegisto';
import {concatMap} from 'rxjs/operators';

@Component({
  selector: 'app-recup',
  templateUrl: './recup.component.html',
  styleUrls: ['./recup.component.css']
})
export class RecuperacaoComponent implements OnInit {


  user: IUserRegisto = new UserRegisto();
  userBD?: any;
  erro = "";
  existeErro = false;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService,
    public af: AngularFirestore, public db: AngularFireDatabase, public angularAuth: AngularFireAuth
  ) { }

  ngOnInit() {

  }

  public nav(){
    this.router.navigate(['/login']);
  }

  public recup(){
    var auth = firebase.auth();
    var emailAddress = this.user.email

    if (emailAddress != null) {
      auth.sendPasswordResetEmail(emailAddress).then(function() {

      }).catch(function(error) {
        // @ts-ignore
        document.getElementById("erroRecup").innerHTML = "Email sem registo";
      });
    }else{
      // @ts-ignore
      document.getElementById("erroRecup").innerHTML = "Coloque o Email!";
    }
    this.nav()
  }

}
