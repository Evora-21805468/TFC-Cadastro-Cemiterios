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
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {




  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public af: AngularFirestore, public angularAuth: AngularFireAuth
  ) { }
  private unsubscribe: Subject<void> = new Subject<void>();

  ngOnInit(): void {


  }


}
