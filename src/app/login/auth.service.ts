import { Injectable } from '@angular/core';
import {IUser} from './user';
import {Router} from '@angular/router';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAutenticado: boolean = false;

  constructor(private router: Router) { }

  login(user: IUser): void {
    if (user.email != null && user.password != null) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
        this.userAutenticado = true;
        this.router.navigate(['/']);
      })
        .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          console.log('Wrong password.');
        } else {
          console.log('Email sem registo');
        }
      });
    }
  }

  canAcessPage(): boolean{
    return this.userAutenticado;
  }
}
