import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
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
  selector: 'app-detailConsultarMonumento',
  templateUrl: './detailConsultarMonumento.component.html',
  styleUrls: ['./detailConsultarMonumento.component.css']
})
export class DetailConsultarMonumentoComponent implements OnInit {

   token: String = "";
   monumento: Monumento = new Monumento("0","0");
   id: number = 0;

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService,
      public af: AngularFirestore,
      public angularAuth: AngularFireAuth,
      private http: HttpClient,
      protected activatedRoute: ActivatedRoute,
      protected route: ActivatedRoute,
      private spinner: NgxSpinnerService,
  ) {

  }
  private unsubscribe: Subject<void> = new Subject<void>();

  async ngOnInit() {
    this.spinner.show();
    // @ts-ignore
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    let a = await this.getToken();
    // @ts-ignore
    this.token = a['access_token'];
    let b = await this.getMonumentos(this.id);
    // @ts-ignore
    let id = b['feature']['attributes']['globalid'];
    this.monumento = new Monumento(this.id.toString(),id);

    // @ts-ignore
    let nome_do_monumento = b['feature']['attributes']['nome_do_monumento'];
    this.monumento._nomeMonumento = nome_do_monumento;
    // @ts-ignore
    let rua = b['feature']['attributes']['rua'];
    this.monumento._rua = rua;
    // @ts-ignore
    let numeroRua = b['feature']['attributes']['numero_da_rua'];
    this.monumento._numeroRua = numeroRua;
    // @ts-ignore
    let tipologia = b['feature']['attributes']['tipologia'];
    this.monumento._tipologia = tipologia;
    // @ts-ignore
    let elementosSimbolicos = b['feature']['attributes']['elementos_simbolicos'];
    this.monumento._elementosSimbolicos = elementosSimbolicos;
    // @ts-ignore
    let arquiteto = b['feature']['attributes']['arquiteto'];
    this.monumento._arquiteto = arquiteto;
    // @ts-ignore
    let construtor = b['feature']['attributes']['construtor'];
    this.monumento._construtor = construtor;
    // @ts-ignore
    let quem_mandou_construir = b['feature']['attributes']['quem_mandou_construir'];
    this.monumento._quemMandouConstruir = quem_mandou_construir;
    // @ts-ignore
    let epitafios = b['feature']['attributes']['epitafios'];
    this.monumento._epitafios = epitafios;
    // @ts-ignore
    let benemeritos_e_mecenas = b['feature']['attributes']['benemeritos_e_mecenas'];
    this.monumento._benemeritos_e_mecenas = benemeritos_e_mecenas;
    // @ts-ignore
    let outros_elementos_escritos = b['feature']['attributes']['outros_elementos_escritos'];
    this.monumento._outros_elementos_escritos = outros_elementos_escritos;
    // @ts-ignore
    let confrontacao = b['feature']['attributes']['confrontacao'];
    this.monumento._confrontacao = confrontacao;
    // @ts-ignore
    let leitura_simbolica = b['feature']['attributes']['leitura_simbolica'];
    this.monumento._leitura_simbolica = leitura_simbolica;
    // @ts-ignore
    let biografia_1_personalidade_no_ja = b['feature']['attributes']['biografia_1_personalidade_no_ja'];
    this.monumento._biografia_1 = biografia_1_personalidade_no_ja;
    // @ts-ignore
    let biografia_2_personalidade_no_ja = b['feature']['attributes']['biografia_2_personalidade_no_ja'];
    this.monumento._biografia_2 = biografia_2_personalidade_no_ja
    // @ts-ignore
    let biografia_3_personalidade_no_ja = b['feature']['attributes']['biografia_3_personalidade_no_ja'];
    this.monumento._biografia_3 = biografia_3_personalidade_no_ja;
    // @ts-ignore
    let biografia_4_personalidade_no_ja = b['feature']['attributes']['biografia_4_personalidade_no_ja'];
    this.monumento._biografia_4 = biografia_4_personalidade_no_ja;
    // @ts-ignore
    let biografia_5_personalidade_no_ja = b['feature']['attributes']['biografia_5_personalidade_no_ja'];
    this.monumento._biografia_5 = biografia_5_personalidade_no_ja;
    // @ts-ignore
    let outras = b['feature']['attributes']['outras'];
    this.monumento._outras = outras;
    // @ts-ignore
    let n_do_processo = b['feature']['attributes']['n_do_processo'];
    this.monumento._n_do_processo = n_do_processo;
    // @ts-ignore
    let alteracoes_obras_e_manutencao = b['feature']['attributes']['alteracoes_obras_e_manutencao'];
    this.monumento._alteracoes_obras_e_manutencao = alteracoes_obras_e_manutencao;
    // @ts-ignore
    let mudanca_de_posse = b['feature']['attributes']['mudanca_de_posse'];
    this.monumento._mudancaPosse = mudanca_de_posse;
    // @ts-ignore
    let outros_elementos_descritivos = b['feature']['attributes']['outros_elementos_descritivos'];
    this.monumento._outros_elementos_descritivos = outros_elementos_descritivos;
    // @ts-ignore
    let sepultados = b['feature']['attributes']['sepultados'];
    this.monumento._sepultados = sepultados;
    // @ts-ignore
    let elementos_simbolicos_other = b['feature']['attributes']['elementos_simbolicos_other'];
    this.monumento._elementos_simbolicos_other = elementos_simbolicos_other;
    // @ts-ignore
    let x = b['feature']['geometry']['x'];
    this.monumento._myX = x;
    // @ts-ignore
    let y = b['feature']['geometry']['y'];
    this.monumento._myY = y;
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
