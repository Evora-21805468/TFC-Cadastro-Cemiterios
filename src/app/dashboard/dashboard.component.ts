import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../login/auth.service";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable, Subject} from "rxjs";
import {switchMap, takeUntil} from "rxjs/operators";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


   width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
   src = "";
   checkSize = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public af: AngularFirestore, public angularAuth: AngularFireAuth
  ) { }
  private unsubscribe: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    if(this.width > 800 ){
      this.checkSize = true
    }else{
      this.checkSize = false
    }
  }


}
