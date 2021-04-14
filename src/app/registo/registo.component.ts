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
import {Observable} from "rxjs";

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

  public items: Observable<any[]> | undefined;
  ngOnInit() {
      this.items = this.af.collection('users').valueChanges();
      console.log( this.items);

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
        .then((userThen) => {
         this.addUserToDB()
          this.authService.setAcessPage(true);
          this.router.navigate(['/']);

        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if(errorCode == "auth/weak-password"){
              this.erro = "A password têm que ter no minimo 6 caracteres!"
          }
          if(errorCode == "auth/email-already-in-use"){
            this.erro = "Este Email já se encontra registado!"
          }

        });
    }
  }

  addUserToDB(){

      var user1 = firebase.auth().currentUser;
      if(user1 != null){
        this.af.collection('users').doc(user1?.uid).set({
          nome: this.user.nome,
          email: this.user.email,
          isAdmin: false,
          uid: user1?.uid,
        }).then(() => {
          console.log("Document successfully written!");
        }).catch((error) => {
          console.error("Error writing document: ", error);
        });
      }
  }

  onSubmit():void{

  }

  registo():void{

  }

}
