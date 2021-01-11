import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IUserRegisto, UserRegisto} from './userRegisto';
import {IUserDB, UserDB} from './userDB';
import firebase from 'firebase';
import {AuthService} from '../login/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.css']
})
export class RegistoComponent implements OnInit {


  user: IUserRegisto = new UserRegisto();
  userBD?: any;
  erro = "";
  existeErro = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public af: AngularFirestore, public db: AngularFireDatabase, public angularAuth: AngularFireAuth
  ) { }

  ngOnInit() {

  }

  confirmarCampos(): boolean{
    if(this.user.nome == null || this.user.email == null || this.user.password == null || this.user.confirmarPassword == null ){
      this.existeErro = true;
      this.erro = "Todos os campos devem estar preenchidos!"
      return false;
    }
    if(this.user.nome == "" || this.user.email == "" || this.user.password == "" || this.user.confirmarPassword == "" ){
      this.existeErro = true;
      this.erro = "Todos os campos devem estar preenchidos!"
      return false;
    }
    if(this.user.password !=  this.user.confirmarPassword ){
      this.existeErro = true;
      this.erro = "As passwords têm que ser iguais"
    }
    this.registoStore();
    return true;
  }



  registoStore() : void {

    if (this.user.email != null && this.user.password != null) {
      firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then((user) => {
          this.userBD = user;
          //this.addUserToDB();

          this.authService.setAcessPage(true);
          this.router.navigate(['/']);

        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

        });
    }
  }

  addUserToDB(){
    const currentUser = firebase.auth().currentUser;
    var database = firebase.database();
    let userDB = new UserDB(this.userBD.user?.uid,this.user.email,this.user.nome,false);
    this.af.collection("users").add(userDB)

  }

  onSubmit():void{

  }

  registo():void{

  }

}
