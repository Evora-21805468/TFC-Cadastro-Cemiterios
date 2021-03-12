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
import {NgxSpinnerService} from "ngx-spinner";


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
      private spinner: NgxSpinnerService,
  ) {

  }
  private unsubscribe: Subject<void> = new Subject<void>();

  async ngOnInit() {
    this.spinner.show();
    let a = await this.getToken();
    // @ts-ignore
    this.token = a['access_token'];
    for(let i= 1; i < 50;i++){
      let b = await this.getMonumentos(i);
      try{
        // @ts-ignore
        let id = b['feature']['attributes']['globalid'];
        var monumento: Monumento = new Monumento(i.toString(),id);

        // @ts-ignore
        let nome_do_monumento = b['feature']['attributes']['nome_do_monumento'];
        monumento._nomeMonumento = nome_do_monumento;
        // @ts-ignore
        let rua = b['feature']['attributes']['rua'];
        monumento._rua = rua;
        // @ts-ignore
        let numeroRua = b['feature']['attributes']['numero_da_rua'];
        monumento._numeroRua = numeroRua;
        // @ts-ignore
        let tipologia = b['feature']['attributes']['tipologia'];
        monumento._tipologia = tipologia;
        // @ts-ignore
        let elementosSimbolicos = b['feature']['attributes']['elementos_simbolicos'];
        monumento._elementosSimbolicos = elementosSimbolicos;
        // @ts-ignore
        let arquiteto = b['feature']['attributes']['arquiteto'];
        monumento._arquiteto = arquiteto;
        // @ts-ignore
        let construtor = b['feature']['attributes']['construtor'];
        monumento._construtor = construtor;
        // @ts-ignore
        let quem_mandou_construir = b['feature']['attributes']['quem_mandou_construir'];
        monumento._quemMandouConstruir = quem_mandou_construir;
        // @ts-ignore
        let epitafios = b['feature']['attributes']['epitafios'];
        monumento._epitafios = epitafios;
        // @ts-ignore
        let benemeritos_e_mecenas = b['feature']['attributes']['benemeritos_e_mecenas'];
        monumento._benemeritos_e_mecenas = benemeritos_e_mecenas;
        // @ts-ignore
        let outros_elementos_escritos = b['feature']['attributes']['outros_elementos_escritos'];
        monumento._outros_elementos_escritos = outros_elementos_escritos;
        // @ts-ignore
        let confrontacao = b['feature']['attributes']['confrontacao'];
        monumento._confrontacao = confrontacao;
        // @ts-ignore
        let leitura_simbolica = b['feature']['attributes']['leitura_simbolica'];
        monumento._leitura_simbolica = leitura_simbolica;
        // @ts-ignore
        let biografia_1_personalidade_no_ja = b['feature']['attributes']['biografia_1_personalidade_no_ja'];
        monumento._biografia_1 = biografia_1_personalidade_no_ja;
        // @ts-ignore
        let biografia_2_personalidade_no_ja = b['feature']['attributes']['biografia_2_personalidade_no_ja'];
        monumento._biografia_2 = biografia_2_personalidade_no_ja
        // @ts-ignore
        let biografia_3_personalidade_no_ja = b['feature']['attributes']['biografia_3_personalidade_no_ja'];
        monumento._biografia_3 = biografia_3_personalidade_no_ja;
        // @ts-ignore
        let biografia_4_personalidade_no_ja = b['feature']['attributes']['biografia_4_personalidade_no_ja'];
        monumento._biografia_4 = biografia_4_personalidade_no_ja;
        // @ts-ignore
        let biografia_5_personalidade_no_ja = b['feature']['attributes']['biografia_5_personalidade_no_ja'];
        monumento._biografia_5 = biografia_5_personalidade_no_ja;
        // @ts-ignore
        let outras = b['feature']['attributes']['outras'];
        monumento._outras = outras;
        // @ts-ignore
        let n_do_processo = b['feature']['attributes']['n_do_processo'];
        monumento._n_do_processo = n_do_processo;
        // @ts-ignore
        let alteracoes_obras_e_manutencao = b['feature']['attributes']['alteracoes_obras_e_manutencao'];
        monumento._alteracoes_obras_e_manutencao = alteracoes_obras_e_manutencao;
        // @ts-ignore
        let mudanca_de_posse = b['feature']['attributes']['mudanca_de_posse'];
        monumento._mudancaPosse = mudanca_de_posse;
        // @ts-ignore
        let outros_elementos_descritivos = b['feature']['attributes']['outros_elementos_descritivos'];
        monumento._outros_elementos_descritivos = outros_elementos_descritivos;
        // @ts-ignore
        let sepultados = b['feature']['attributes']['sepultados'];
        monumento._sepultados = sepultados;
        // @ts-ignore
        let elementos_simbolicos_other = b['feature']['attributes']['elementos_simbolicos_other'];
        monumento._elementos_simbolicos_other = elementos_simbolicos_other;
        // @ts-ignore
        let x = b['feature']['geometry']['x'];
        monumento._myX = x;
        // @ts-ignore
        let y = b['feature']['geometry']['y'];
        monumento._myY = y;
        // @ts-ignore
        this.monumentos.push(monumento);
      }catch (ex){

      }
    }
    //TODO confirmar numeros e assins
    /*
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
        var monumento: Monumento = new Monumento(i.toString(),id);
        monumento._nomeMonumento = nome_do_monumento;
        monumento._rua = rua;
        monumento._numeroRua = numeroRua;
        // @ts-ignore
        this.monumentos.push(monumento);
      }catch (ex){

      }
    }

     */
    this.spinner.hide();
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
