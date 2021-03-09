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
import {IUserDB} from "../consultarUsers/userDB";
import { Monumento} from "./monumento";


@Component({
  selector: 'app-consultarMonumento',
  templateUrl: './consultarMonumento.component.html',
  styleUrls: ['./consultarMonumento.component.css']
})
export class ConsultarMonumentoComponent implements OnInit {

   token: String = "";
   monumentos: Monumento[] = [];

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
    let a = await this.getToken();
    // @ts-ignore
    this.token = a['access_token'];
    for(let i= 1; i < 50;i++){
      let b = await this.getMonumentos(i);
      try{
        // @ts-ignore
        let id = b['feature']['attributes']['globalid'];
        // @ts-ignore
        let nome_do_monumento = b['feature']['attributes']['nome_do_monumento'];
        // @ts-ignore
        let rua = b['feature']['attributes']['rua'];
        // @ts-ignore
        let numeroRua = b['feature']['attributes']['numero_da_rua'];
        var monumento: Monumento = new Monumento(id,nome_do_monumento,rua,numeroRua);
        // @ts-ignore
        this.monumentos.push(monumento);
      }catch (ex){

      }
    }
    //TODO confirmar numeros e assins
    for(let i= 50; i < 200;i++){
      let b = await this.getMonumentos(i);
      try{
        // @ts-ignore
        let id = b['feature']['attributes']['globalid'];
        // @ts-ignore
        let nome_do_monumento = b['feature']['attributes']['nome_do_monumento'];
        // @ts-ignore
        let rua = b['feature']['attributes']['rua'];
        // @ts-ignore
        let numeroRua = b['feature']['attributes']['numero_da_rua'];
        var monumento: Monumento = new Monumento(id,nome_do_monumento,rua,numeroRua);
        // @ts-ignore
        this.monumentos.push(monumento);
      }catch (ex){

      }
    }
  }


  async getToken(){
    let i = ""
    let body = new HttpParams().set('client_id', 'XXScCjKChAwLaplj').set('client_secret', 'd32e344e3b144845a07d75fef9cd9b9e').set('grant_type','client_credentials');
    let response: Promise<Object> = this.http.post('https://www.arcgis.com/sharing/rest/oauth2/token', body).toPromise();
    return response;
  }

  async getMonumentos(num: number){
    let i = ""
    let body = new HttpParams().set('f', 'json').set('token', this.token.toString());
    let url = 'https://services-eu1.arcgis.com/kJpwBKPhHXDuJncY/arcgis/rest/services/survey123_1278669bc6f64f089d84969cb31c3aa7/FeatureServer/survey/' + num;
    let response: Promise<Object> = this.http.post(url, body).toPromise();
    return response;
  }


}
