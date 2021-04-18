import { Injectable } from '@angular/core';
import {IUser} from './user';
import {Router} from '@angular/router';
import firebase from 'firebase';
import {SharedAuth} from './SharedAuth'
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAutenticado: boolean = false;

  constructor(private router: Router,public ls: SharedAuth,public af: AngularFirestore) {

  }

  login(user: IUser) {
    if(user.email == null || user.email == ""){
      // @ts-ignore
      document.getElementById("erro").innerHTML = "Preencha todos os campos!";
      return;
    }
    if(user.password == null || user.password == ""){
      // @ts-ignore
      document.getElementById("erro").innerHTML = "Preencha todos os campos!";
      return;
    }
    if (user.email != null && user.password != null) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
        this.userAutenticado = true;
        this.checkAdmin()
        this.router.navigate(['/']);
      })
        .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode ===  "auth/wrong-password") {
          // @ts-ignore
          document.getElementById("erro").innerHTML = "Password Errada.";
        } else {
          // @ts-ignore
          document.getElementById("erro").innerHTML = "Email Sem Registo.";
        }
      });
    }
  }

  setAcessPage(bool: boolean){
    this.userAutenticado = bool;
  }

  canAcessPage(): boolean{
    return this.userAutenticado;
  }


  checkAdmin(){
    let uid: string | undefined = firebase.auth().currentUser?.uid
    if(uid != undefined){
      var docRef = this.af.collection("users").doc(uid);
      docRef.get().toPromise().then((doc) => {
        if (doc.exists) {
          // @ts-ignore
          let bool: boolean = doc.data().isAdmin
          this.ls.setGlobalVar(bool)
        } else {
          console.log("No such document!");
        }
      })

    }
  }


}
