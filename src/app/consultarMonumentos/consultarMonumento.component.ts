import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../login/auth.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RequestMethod, RequestOptions} from "@angular/http";
import {combineAll} from "rxjs/operators";


@Component({
  selector: 'app-consultarMonumento',
  templateUrl: './consultarMonumento.component.html',
  styleUrls: ['./consultarMonumento.component.css']
})
export class ConsultarMonumentoComponent implements OnInit {

   token: String = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public af: AngularFirestore,
    public angularAuth: AngularFireAuth,
    private http: HttpClient,
  ) {

  }
  private unsubscribe: Subject<void> = new Subject<void>();

  async ngOnInit() {
    let a = await this.ultimatentativa();
    // @ts-ignore
    this.token = a['access_token'];
    console.log(this.token);
  }


  async ultimatentativa(){
    let i = ""
    let body = new HttpParams().set('client_id', 'XXScCjKChAwLaplj').set('client_secret', 'd32e344e3b144845a07d75fef9cd9b9e').set('grant_type','client_credentials');
    let response: Promise<Object> = this.http.post('https://www.arcgis.com/sharing/rest/oauth2/token', body).toPromise();
    return response;
  }


}
