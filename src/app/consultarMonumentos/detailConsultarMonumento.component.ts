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
   list:Array<string> = [];
   link: string = "https://www.google.com/maps/search/?api=1&query="

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
    try{
      // @ts-ignore
      let id = b['feature']['attributes']['globalid'];
      this.monumento = new Monumento(this.id.toString(),id);
      // @ts-ignore
      let nome_do_monumento = b['feature']['attributes']['nome_do_monumento'];
      if(nome_do_monumento == null){
        this.monumento._nomeMonumento = "Sem Dados";
      }else{
        this.monumento._nomeMonumento = nome_do_monumento;
      }
      // @ts-ignore
      let rua = b['feature']['attributes']['rua'];
      if(nome_do_monumento == null){
        this.monumento._rua = "Sem Dados";
      }else{
        this.monumento._rua = rua;
      }
      // @ts-ignore
      let numeroRua = b['feature']['attributes']['numero_da_rua'];
      this.monumento._numeroRua = numeroRua;
      if(numeroRua == null){
        this.monumento._numeroRua = "Sem Dados";
      }
      // @ts-ignore
      let tipologia = b['feature']['attributes']['tipologia'];
      this.monumento._tipologia = tipologia;
      if(tipologia == null){
        this.monumento._tipologia = "Sem Dados";
      }else{
        switch (tipologia){
          case "jazigo_capela":{
            this.monumento._tipologia = "Jazigo Capela";
            break;
          }
          case "jazigo_subterrâneo":{
            this.monumento._tipologia = "Jazigo subterrâneo";
            break;
          }
          case "monumento":{
            this.monumento._tipologia = "Monumento";
            break;
          }
          case "sepultura_perpétua":{
            this.monumento._tipologia = "Sepultura Perpétua";
            break;
          }
        }
      }

      // @ts-ignore
      let elementosSimbolicos = b['feature']['attributes']['elementos_simbolicos'];
      this.monumento._elementosSimbolicos = elementosSimbolicos;
      if(elementosSimbolicos  == null){
        this.monumento._elementosSimbolicos = "Sem Dados";
      }
      let splitElementos = elementosSimbolicos.split(",");
      for (let i of splitElementos){
        switch (i){
          case "triângulo_simples": {
            this.list.push("Triangulo Simples");
            break;
          }
          case "triângulo_solarizado": {
            this.list.push("Triângulo solarizado");
            break;
          }
          case "triângulo_com_olho": {
            this.list.push("Triângulo com Olho");
            break;
          }
          case "triângulos_no_arranjo_e_decoraç": {
            this.list.push("Triângulos no arranjo e decoração geométrca");
            break;
          }
          case "repetições_geométricas_de_figur": {
            this.list.push("Repetições geométricas de figuras triangulares (3, 7, etc)");
            break;
          }
          case "esquadro_compasso_e_ou_prumo": {
            this.list.push("Esquadro, Compasso e/ou Prumo");
            break;
          }
          case "colmeia_e_ou_abelhas": {
            this.list.push("Colmeia e/ou Abelhas");
            break;
          }
          case "sol_radiado": {
            this.list.push("Sol radiado");
            break;
          }
          case "águas_primordiais": {
            this.list.push("Águas primordiais");
            break;
          }
          case "chão_axadrezado": {
            this.list.push("Chão axadrezado");
            break;
          }
          case "superfície_axadrezada": {
            this.list.push("Superfície axadrezada");
            break;
          }
          case "três_degraus": {
            this.list.push("Três degraus");
            break;
          }
          case "escrita_cifrada": {
            this.list.push("Escrita cifrada");
            break;
          }
          case "estrela_de_cinco_pontas": {
            this.list.push("Estrela de cinco pontas");
            break;
          }
          case "duas_colunas": {
            this.list.push("Duas colunas");
            break;
          }
          case "romãs": {
            this.list.push("Romãs");
            break;
          }
          case "malhete": {
            this.list.push("Malhete");
            break;
          }
          case "colar": {
            this.list.push("Colar");
            break;
          }
          case "forma_piramidal": {
            this.list.push("Forma piramidal");
            break;
          }
          case "lágrimas_invertidas": {
            this.list.push(" Lágrimas invertidas");
            break;
          }
          case "aperto_de_mão": {
            this.list.push("Aperto de mão");
            break;
          }
          case "folhas_de_acácia": {
            this.list.push("Folhas de acácia");
            break;
          }
          case "águia_bicéfala": {
            this.list.push("Águia bicéfala");
            break;
          }
          case "simulação_de_templo": {
            this.list.push("Simulação de templo");
            break;
          }
          case "elementos_simbolicos_other": {
            this.list.push("Outro");
            break;
          }
        }
      }
      // @ts-ignore
      let arquiteto = b['feature']['attributes']['arquiteto'];
      this.monumento._arquiteto = arquiteto;
      if(arquiteto  == null){
        this.monumento._arquiteto = "Sem Dados";
      }
      // @ts-ignore
      let construtor = b['feature']['attributes']['construtor'];
      this.monumento._construtor = construtor;
      if(construtor  == null){
        this.monumento._construtor = "Sem Dados";
      }
      // @ts-ignore
      let quem_mandou_construir = b['feature']['attributes']['quem_mandou_construir'];
      this.monumento._quemMandouConstruir = quem_mandou_construir;
      if(quem_mandou_construir  == null){
        this.monumento._quemMandouConstruir = "Sem Dados";
      }
      // @ts-ignore
      let epitafios = b['feature']['attributes']['epitafios'];
      if(epitafios == null){
        epitafios = "Sem Dados";
      }
      this.monumento._epitafios = epitafios;
      // @ts-ignore
      let benemeritos_e_mecenas = b['feature']['attributes']['benemeritos_e_mecenas'];
      if(benemeritos_e_mecenas == null){
        benemeritos_e_mecenas = "Sem Dados";
      }
      this.monumento._benemeritos_e_mecenas = benemeritos_e_mecenas;
      // @ts-ignore
      let outros_elementos_escritos = b['feature']['attributes']['outros_elementos_escritos'];
      if(outros_elementos_escritos == null){
        outros_elementos_escritos = "Sem Dados";
      }
      this.monumento._outros_elementos_escritos = outros_elementos_escritos;
      // @ts-ignore
      let confrontacao = b['feature']['attributes']['confrontacao'];
      if(confrontacao == null){
        confrontacao = "Sem Dados";
      }
      this.monumento._confrontacao = confrontacao;
      // @ts-ignore
      let leitura_simbolica = b['feature']['attributes']['leitura_simbolica'];
      if(leitura_simbolica == null){
        leitura_simbolica = "Sem Dados";
      }
      this.monumento._leitura_simbolica = leitura_simbolica;
      // @ts-ignore
      let biografia_1_personalidade_no_ja = b['feature']['attributes']['biografia_1_personalidade_no_ja'];
      if(biografia_1_personalidade_no_ja == null){
        biografia_1_personalidade_no_ja = "Sem Dados";
      }
      this.monumento._biografia_1 = biografia_1_personalidade_no_ja;
      // @ts-ignore
      let biografia_2_personalidade_no_ja = b['feature']['attributes']['biografia_2_personalidade_no_ja'];
      if(biografia_2_personalidade_no_ja == null){
        biografia_2_personalidade_no_ja = "Sem Dados";
      }
      this.monumento._biografia_2 = biografia_2_personalidade_no_ja
      // @ts-ignore
      let biografia_3_personalidade_no_ja = b['feature']['attributes']['biografia_3_personalidade_no_ja'];
      if(biografia_3_personalidade_no_ja == null){
        biografia_3_personalidade_no_ja = "Sem Dados";
      }
      this.monumento._biografia_3 = biografia_3_personalidade_no_ja;
      // @ts-ignore
      let biografia_4_personalidade_no_ja = b['feature']['attributes']['biografia_4_personalidade_no_ja'];
      // @ts-ignore
      if(biografia_4_personalidade_no_ja == null){
        biografia_4_personalidade_no_ja = "Sem Dados";
      }
      this.monumento._biografia_4 = biografia_4_personalidade_no_ja;
      // @ts-ignore
      let biografia_5_personalidade_no_ja = b['feature']['attributes']['biografia_5_personalidade_no_ja'];
      if(biografia_5_personalidade_no_ja == null){
        biografia_5_personalidade_no_ja = "Sem Dados";
      }
      this.monumento._biografia_5 = biografia_5_personalidade_no_ja;
      // @ts-ignore
      let outras = b['feature']['attributes']['outras'];
      if(outras == null){
        outras = "Sem Dados";
      }
      this.monumento._outras = outras;
      // @ts-ignore
      let n_do_processo = b['feature']['attributes']['n_do_processo'];
      if(n_do_processo == null){
        n_do_processo = "Sem Dados";
      }
      this.monumento._n_do_processo = n_do_processo;
      // @ts-ignore
      let alteracoes_obras_e_manutencao = b['feature']['attributes']['alteracoes_obras_e_manutencao'];
      if(alteracoes_obras_e_manutencao == null ){
        alteracoes_obras_e_manutencao = "Sem Dados";
      }
      this.monumento._alteracoes_obras_e_manutencao = alteracoes_obras_e_manutencao;
      // @ts-ignore
      let mudanca_de_posse = b['feature']['attributes']['mudanca_de_posse'];
      if(mudanca_de_posse == null){
        mudanca_de_posse = "Sem Dados";
      }
      this.monumento._mudancaPosse = mudanca_de_posse;
      // @ts-ignore
      let outros_elementos_descritivos = b['feature']['attributes']['outros_elementos_descritivos'];
      if(outros_elementos_descritivos == null){
        outros_elementos_descritivos = "Sem Dados";
      }
      this.monumento._outros_elementos_descritivos = outros_elementos_descritivos;
      // @ts-ignore
      let sepultados = b['feature']['attributes']['sepultados'];
      if(sepultados == null){
        sepultados = "Sem Dados";
      }
      this.monumento._sepultados = sepultados;
      // @ts-ignore
      let elementos_simbolicos_other = b['feature']['attributes']['elementos_simbolicos_other'];
      if(elementos_simbolicos_other == null){
        elementos_simbolicos_other = "Sem Dados";
      }
      this.monumento._elementos_simbolicos_other = elementos_simbolicos_other;
      // @ts-ignore
      let x = b['feature']['geometry']['x'];
      this.monumento._myX = x;
      // @ts-ignore
      let y = b['feature']['geometry']['y'];
      this.monumento._myY = y;
      this.link += y;
      this.link += ",";
      this.link += x;
      // @ts-ignore
      this.monumentos.push(monumento);
    }catch (ex){

    }
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
