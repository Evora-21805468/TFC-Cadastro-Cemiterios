import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../login/auth.service";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable, Subject} from "rxjs";
import {switchMap, takeUntil} from "rxjs/operators";
import {IUserDB} from "./userDB";


@Component({
  selector: 'app-consultarUsers',
  templateUrl: './consultarUsers.component.html',
  styleUrls: ['./consultarUsers.component.css']
})
export class ConsultarUsersComponent implements OnInit {

  users: IUserDB[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public af: AngularFirestore, public angularAuth: AngularFireAuth
  ) { }
  private unsubscribe: Subject<void> = new Subject<void>();

  ngOnInit(): void {

    this.getUsers().subscribe((data: IUserDB[])  => {
      this.users = data;
    }, err => {
      console.log("ERRO")
    });
  }


  public getUsers(): Observable<Array<IUserDB>> {
    return this.angularAuth.user
      .pipe(takeUntil(this.unsubscribe),
        switchMap(user => {
          return this.af.collection<IUserDB>("users").valueChanges();
        }));
  }

  tornarAdmin(user: IUserDB): void{
    this.af.collection('users').doc(user.uid).set({
      nome: user.nome,
      email: user.email,
      isAdmin: !user.isAdmin,
      uid: user.uid,
        });

  }

}
