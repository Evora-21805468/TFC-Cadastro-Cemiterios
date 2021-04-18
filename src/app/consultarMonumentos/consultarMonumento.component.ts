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
import {SharedAuth} from '../login/SharedAuth'


@Component({
  selector: 'app-consultarMonumento',
  templateUrl: './consultarMonumento.component.html',
  styleUrls: ['./consultarMonumento.component.css']
})
export class ConsultarMonumentoComponent implements OnInit {

   token: String = "";
   i = 0;
   admin: boolean = false;
   monumentos: Monumento[] = [];
  searchTerms = "";
  jazigoCapelaCheck = false;
  jazigoSubterraneoCheck = false;
  monumentoCheck = false;
  sepulturaPerpetuaCheck = false;

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService,
      public af: AngularFirestore,
      public angularAuth: AngularFireAuth,
      private http: HttpClient,
      private spinner: NgxSpinnerService,
      public ls: SharedAuth
  ) {

  }
  private unsubscribe: Subject<void> = new Subject<void>();

  async ngOnInit() {
   this.moreMonumentos()
    this.admin = this.ls.getGlobalVar()
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

  async moreMonumentos(){
    this.spinner.show();
    let a = await this.getToken();
    // @ts-ignore
    this.token = a['access_token'];
    let f = this.i + 50
    for(this.i; this.i < f;this.i++){
      let i = this.i;
      let b = await this.getMonumentos(i);
      try{
        // @ts-ignore
        let id = b['feature']['attributes']['globalid'];
        var monumento: Monumento = new Monumento(i.toString(),id);

        // @ts-ignore
        let nome_do_monumento = b['feature']['attributes']['nome_do_monumento'];
        if(nome_do_monumento == ""){
          monumento._nomeMonumento = "Sem Dados";
        }else{
          monumento._nomeMonumento = nome_do_monumento;
        }
        // @ts-ignore
        let rua = b['feature']['attributes']['rua'];
        if(nome_do_monumento == ""){
          monumento._rua = "Sem Dados";
        }else{
          monumento._rua = rua;
        }
        // @ts-ignore
        let numeroRua = b['feature']['attributes']['numero_da_rua'];
        monumento._numeroRua = numeroRua;
        if(numeroRua == ""){
          monumento._numeroRua = "Sem Dados";
        }
        // @ts-ignore
        let tipologia = b['feature']['attributes']['tipologia'];
        if(tipologia == null){
         monumento._tipologia = "Sem Dados";
        }else{
          let splitElementosTipo = tipologia.split(",");
          for (let i of splitElementosTipo) {
            switch (i) {
              case "jazigo_capela": {
               monumento._tipologia += "Jazigo Capela /";
                break;
              }
              case "jazigo_subterrâneo": {
                monumento._tipologia += "Jazigo subterrâneo /";
                break;
              }
              case "monumento": {
                monumento._tipologia += "Monumento /";
                break;
              }
              case "sepultura_perpétua": {
                monumento._tipologia += "Sepultura Perpétua /";
                break;
              }
            }
          }
          monumento._tipologia = monumento._tipologia.slice(0,-1)
        }
        // @ts-ignore
        let elementosSimbolicos = b['feature']['attributes']['elementos_simbolicos'];
        monumento._elementosSimbolicos = elementosSimbolicos;
        if(elementosSimbolicos  == ""){
          monumento._elementosSimbolicos = "Sem Dados";
        }
        // @ts-ignore
        let arquiteto = b['feature']['attributes']['arquiteto'];
        monumento._arquiteto = arquiteto;
        if(arquiteto  == ""){
          monumento._arquiteto = "Sem Dados";
        }
        // @ts-ignore
        let construtor = b['feature']['attributes']['construtor'];
        monumento._construtor = construtor;
        if(construtor  == ""){
          monumento._construtor = "Sem Dados";
        }
        // @ts-ignore
        let quem_mandou_construir = b['feature']['attributes']['quem_mandou_construir'];
        monumento._quemMandouConstruir = quem_mandou_construir;
        if(quem_mandou_construir  == ""){
          monumento._quemMandouConstruir = "Sem Dados";
        }
        // @ts-ignore
        let epitafios = b['feature']['attributes']['epitafios'];
        if(epitafios == ""){
          epitafios = "Sem Dados";
        }
        monumento._epitafios = epitafios;
        // @ts-ignore
        let benemeritos_e_mecenas = b['feature']['attributes']['benemeritos_e_mecenas'];
        if(benemeritos_e_mecenas == ""){
          benemeritos_e_mecenas = "Sem Dados";
        }
        monumento._benemeritos_e_mecenas = benemeritos_e_mecenas;
        // @ts-ignore
        let outros_elementos_escritos = b['feature']['attributes']['outros_elementos_escritos'];
        if(outros_elementos_escritos == ""){
          outros_elementos_escritos = "Sem Dados";
        }
        monumento._outros_elementos_escritos = outros_elementos_escritos;
        // @ts-ignore
        let confrontacao = b['feature']['attributes']['confrontacao'];
        if(confrontacao == ""){
          confrontacao = "Sem Dados";
        }
        monumento._confrontacao = confrontacao;
        // @ts-ignore
        let leitura_simbolica = b['feature']['attributes']['leitura_simbolica'];
        if(leitura_simbolica == ""){
          leitura_simbolica = "Sem Dados";
        }
        monumento._leitura_simbolica = leitura_simbolica;
        // @ts-ignore
        let biografia_1_personalidade_no_ja = b['feature']['attributes']['biografia_1_personalidade_no_ja'];
        if(biografia_1_personalidade_no_ja == ""){
          biografia_1_personalidade_no_ja = "Sem Dados";
        }
        monumento._biografia_1 = biografia_1_personalidade_no_ja;
        // @ts-ignore
        let biografia_2_personalidade_no_ja = b['feature']['attributes']['biografia_2_personalidade_no_ja'];
        if(biografia_2_personalidade_no_ja == ""){
          biografia_2_personalidade_no_ja = "Sem Dados";
        }
        monumento._biografia_2 = biografia_2_personalidade_no_ja
        // @ts-ignore
        let biografia_3_personalidade_no_ja = b['feature']['attributes']['biografia_3_personalidade_no_ja'];
        if(biografia_3_personalidade_no_ja == null){
          biografia_3_personalidade_no_ja = "Sem Dados";
        }
        monumento._biografia_3 = biografia_3_personalidade_no_ja;
        // @ts-ignore
        let biografia_4_personalidade_no_ja = b['feature']['attributes']['biografia_4_personalidade_no_ja'];
        if(biografia_4_personalidade_no_ja == ""){
          biografia_4_personalidade_no_ja = "Sem Dados";
        }
        monumento._biografia_4 = biografia_4_personalidade_no_ja;
        // @ts-ignore
        let biografia_5_personalidade_no_ja = b['feature']['attributes']['biografia_5_personalidade_no_ja'];
        if(biografia_5_personalidade_no_ja == ""){
          biografia_5_personalidade_no_ja = "Sem Dados";
        }
        monumento._biografia_5 = biografia_5_personalidade_no_ja;
        // @ts-ignore
        let outras = b['feature']['attributes']['outras'];
        if(outras == ""){
          outras = "Sem Dados";
        }
        monumento._outras = outras;
        // @ts-ignore
        let n_do_processo = b['feature']['attributes']['n_do_processo'];
        if(n_do_processo == ""){
          n_do_processo = "Sem Dados";
        }
        monumento._n_do_processo = n_do_processo;
        // @ts-ignore
        let alteracoes_obras_e_manutencao = b['feature']['attributes']['alteracoes_obras_e_manutencao'];
        if(alteracoes_obras_e_manutencao == "" ){
          alteracoes_obras_e_manutencao = "Sem Dados";
        }
        monumento._alteracoes_obras_e_manutencao = alteracoes_obras_e_manutencao;
        // @ts-ignore
        let mudanca_de_posse = b['feature']['attributes']['mudanca_de_posse'];
        if(mudanca_de_posse == ""){
          mudanca_de_posse = "Sem Dados";
        }
        monumento._mudancaPosse = mudanca_de_posse;
        // @ts-ignore
        let outros_elementos_descritivos = b['feature']['attributes']['outros_elementos_descritivos'];
        if(outros_elementos_descritivos == ""){
          outros_elementos_descritivos = "Sem Dados";
        }
        monumento._outros_elementos_descritivos = outros_elementos_descritivos;
        // @ts-ignore
        let sepultados = b['feature']['attributes']['sepultados'];
        if(sepultados == ""){
          sepultados = "Sem Dados";
        }
        monumento._sepultados = sepultados;
        // @ts-ignore
        let elementos_simbolicos_other = b['feature']['attributes']['elementos_simbolicos_other'];
        if(elementos_simbolicos_other == ""){
          elementos_simbolicos_other = "Sem Dados";
        }
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
    //console.log(this.i)
  }

  apagarMonumento(id: string){
    if(confirm("DESEJA APAGAR ESTE MONUMENTO?")) {
      let edits =
        "[\n" +
       id +"\n"+
        "]\n"
      let i = ""
      let body = new HttpParams().set('f', 'json').set('token', this.token.toString()).set('deletes', edits);
      let response: Promise<Object> = this.http.post('https://services-eu1.arcgis.com/kJpwBKPhHXDuJncY/arcgis/rest/services/survey123_1278669bc6f64f089d84969cb31c3aa7_stakeholder/FeatureServer/0/applyEdits', body).toPromise();
      let count = 0;
      let iN: number = 0
      for(iN; iN < this.monumentos.length; iN++){
        if(this.monumentos[iN]._id == id){
          count = iN;
        }
      }
      this.monumentos.splice(count,1)
      return response;
    }else{
      return ""
    }


  }

  search(term: string):void{
    this.searchTerms = term;
  }

  searchCheck(monumento: Monumento): boolean {
    if (this.searchTerms === "") {
      if(this.jazigoCapelaCheck || this.jazigoSubterraneoCheck || this.monumentoCheck || this.sepulturaPerpetuaCheck){
        if(this.jazigoCapelaCheck && monumento._tipologia === "Jazigo Capela "){
          return true
        }
        if(this.jazigoSubterraneoCheck && monumento._tipologia == "Jazigo subterrâneo "){
          return true
        }
        if(this.monumentoCheck && monumento._tipologia == "Monumento "){
          return true
        }
        if(this.sepulturaPerpetuaCheck && monumento._tipologia == "Sepultura Perpétua "){
          return true
        }
        return false
      }
      return true
    }


    if(monumento._nomeMonumento!= null){
      if ( monumento._nomeMonumento.toLowerCase().includes(this.searchTerms.toLowerCase())  ) {
        if(this.jazigoCapelaCheck || this.jazigoSubterraneoCheck || this.monumentoCheck || this.sepulturaPerpetuaCheck){
          if(this.jazigoCapelaCheck && monumento._tipologia === "Jazigo Capela "){
            return true
          }
          if(this.jazigoSubterraneoCheck && monumento._tipologia == "Jazigo subterrâneo "){
            return true
          }
          if(this.monumentoCheck && monumento._tipologia == "Monumento "){
            return true
          }
          if(this.sepulturaPerpetuaCheck && monumento._tipologia == "Sepultura Perpétua "){
            return true
          }
          return false
        }
        return true
      }
    }

    if(monumento._tipologia!= null){
      if ( monumento._tipologia.toLowerCase().includes(this.searchTerms.toLowerCase())  ) {
        if(this.jazigoCapelaCheck || this.jazigoSubterraneoCheck || this.monumentoCheck || this.sepulturaPerpetuaCheck){
          if(this.jazigoCapelaCheck && monumento._tipologia === "Jazigo Capela "){
            return true
          }
          if(this.jazigoSubterraneoCheck && monumento._tipologia == "Jazigo subterrâneo "){
            return true
          }
          if(this.monumentoCheck && monumento._tipologia == "Monumento "){
            return true
          }
          if(this.sepulturaPerpetuaCheck && monumento._tipologia == "Sepultura Perpétua "){
            return true
          }
          return false
        }
        return true
      }

    }

    if(monumento._numeroRua!= null){
      if ( monumento._numeroRua.toString().toLowerCase().includes(this.searchTerms.toLowerCase())  ) {
        if(this.jazigoCapelaCheck || this.jazigoSubterraneoCheck || this.monumentoCheck || this.sepulturaPerpetuaCheck){
          if(this.jazigoCapelaCheck && monumento._tipologia === "Jazigo Capela "){
            return true
          }
          if(this.jazigoSubterraneoCheck && monumento._tipologia == "Jazigo subterrâneo "){
            return true
          }
          if(this.monumentoCheck && monumento._tipologia == "Monumento "){
            return true
          }
          if(this.sepulturaPerpetuaCheck && monumento._tipologia == "Sepultura Perpétua "){
            return true
          }
          return false
        }
        return true
      }
    }
/*
    if(monumento._arquiteto!= null){
      if ( monumento._arquiteto.toLowerCase().includes(this.searchTerms.toLowerCase())  ) {
        if(this.jazigoCapelaCheck || this.jazigoSubterraneoCheck || this.monumentoCheck || this.sepulturaPerpetuaCheck){
          if(this.jazigoCapelaCheck && monumento._tipologia === "Jazigo Capela "){
            return true
          }
          if(this.jazigoSubterraneoCheck && monumento._tipologia == "Jazigo subterrâneo "){
            return true
          }
          if(this.monumentoCheck && monumento._tipologia == "Monumento "){
            return true
          }
          if(this.sepulturaPerpetuaCheck && monumento._tipologia == "Sepultura Perpétua "){
            return true
          }
          return false
        }
      }
    }

 */

    return false;
  }


}
