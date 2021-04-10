import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {AuthService} from "../login/auth.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {Monumento} from "../consultarMonumentos/monumento";



@Component({
  selector: 'app-detailEditMonumento',
  templateUrl: 'editMonumento.component.html',

})
export class EditMonumentoComponent implements OnInit {

  token: String = "";
  monumento: Monumento = new Monumento("0", "0");
  id: number = 0;
  list: Array<string> = [];
  jazigoCapelaCheck = false;
  jazigoSubterraneoCheck = false;
  monumentoCheck = false;
  sepulturaPerpetuaCheck = false;


  triangulo_simples = false;
  triangulo_solarizado = false;
  triangulo_com_olho = false;
  triangulos_no_arranjo_e_decorac = false;
  repeticoes_geometricas_de_figur = false;
  esquadro_compasso_e_ou_prumo = false;
  colmeia_e_ou_abelhas = false;
  sol_radiado = false;
  aguas_primordiais = false;
  chao_axadrezado = false;
  superficie_axadrezada = false
  tres_degraus = false
  escrita_cifrada = false;
  estrela_de_cinco_pontas = false;
  duas_colunas = false;
  romas = false;
  malhete = false;
  colar = false;
  forma_piramidal = false;
  lagrimas_invertidas = false;
  aperto_de_mao = false;
  folhas_de_acacia = false;
  aguia_bicefala = false;
  simulacao_de_templo = false;
  elementos_simbolicos_other = false;

  formGroup: FormGroup = new FormGroup(
    {
      nomeMonumento: new FormControl(''),
      rua: new FormControl(''),
      numeroRua: new FormControl(''),
      //Tipologia, escolha
      //Elementos Simbolicos, escolha
      arquiteto: new FormControl(''),
      construtor: new FormControl(''),
      quem_mandou_construir: new FormControl(''),
      epitafios: new FormControl(''),
      benemeritos_e_mecenas: new FormControl(''),
      outros_elementos_escritos: new FormControl(''),
      confrontacao: new FormControl(''),
      leitura_simbolica: new FormControl(''),
      biografia_1_personalidade_no_ja: new FormControl(''),
      biografia_2_personalidade_no_ja: new FormControl(''),
      biografia_3_personalidade_no_ja: new FormControl(''),
      biografia_4_personalidade_no_ja: new FormControl(''),
      biografia_5_personalidade_no_ja: new FormControl(''),
      outras: new FormControl(''),
      n_do_processo: new FormControl(''),
      alteracoes_obras_e_manutencao: new FormControl(''),
      mudanca_de_posse: new FormControl(''),
      outros_elementos_descritivos: new FormControl(''),
      sepultados: new FormControl(''),
      // x y
    }
  );


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
    try {
      // @ts-ignore
      let id = b['feature']['attributes']['globalid'];
      this.monumento = new Monumento(this.id.toString(), id);
      // @ts-ignore
      let nome_do_monumento = b['feature']['attributes']['nome_do_monumento'];
      if (nome_do_monumento == null) {
        this.monumento._nomeMonumento = "Sem Dados";
      } else {
        this.monumento._nomeMonumento = nome_do_monumento;
      }
      // @ts-ignore
      let rua = b['feature']['attributes']['rua'];
      if (rua == null) {
        this.monumento._rua = "Sem Dados";
      } else {
        this.monumento._rua = rua;
      }
      // @ts-ignore
      let numeroRua = b['feature']['attributes']['numero_da_rua'];
      this.monumento._numeroRua = numeroRua;
      if (numeroRua == null) {
        this.monumento._numeroRua = "Sem Dados";
      }
      // @ts-ignore
      let tipologia = b['feature']['attributes']['tipologia'];
      this.monumento._tipologia = tipologia;
      if (tipologia == null) {
        this.monumento._tipologia = "Sem Dados";
      } else {
        let splitElementosTipo = tipologia.split(",");
        for (let i of splitElementosTipo) {
          switch (i) {
            case "jazigo_capela": {
              this.monumento._tipologia = "Jazigo Capela";
              this.jazigoCapelaCheck = true;
              break;
            }
            case "jazigo_subterrâneo": {
              this.monumento._tipologia = "Jazigo subterrâneo";
              this.jazigoSubterraneoCheck = true;
              break;
            }
            case "monumento": {
              this.monumento._tipologia = "Monumento";
              this.monumentoCheck = true;
              break;
            }
            case "sepultura_perpétua": {
              this.monumento._tipologia = "Sepultura Perpétua";
              this.sepulturaPerpetuaCheck = true;
              break;
            }
          }
        }
      }

      // @ts-ignore
      let elementosSimbolicos = b['feature']['attributes']['elementos_simbolicos'];
      this.monumento._elementosSimbolicos = elementosSimbolicos;
      if (elementosSimbolicos == null) {
        this.monumento._elementosSimbolicos = "Sem Dados";
      }
      let splitElementos = elementosSimbolicos.split(",");
      for (let i of splitElementos) {
        switch (i) {
          case "triângulo_simples": {
            this.list.push("Triangulo Simples");
            this.triangulo_simples = true;
            break;
          }
          case "triângulo_solarizado": {
            this.list.push("Triângulo solarizado");
            this.triangulo_solarizado = true;
            break;
          }
          case "triângulo_com_olho": {
            this.list.push("Triângulo com Olho");
            this.triangulo_com_olho = true;
            break;
          }
          case "triângulos_no_arranjo_e_decoraç": {
            this.list.push("Triângulos no arranjo e decoração geométrca");
            this.triangulos_no_arranjo_e_decorac = true;
            break;
          }
          case "repetições_geométricas_de_figur": {
            this.list.push("Repetições geométricas de figuras triangulares (3, 7, etc)");
            this.repeticoes_geometricas_de_figur = true;
            break;
          }
          case "esquadro_compasso_e_ou_prumo": {
            this.list.push("Esquadro, Compasso e/ou Prumo");
            this.esquadro_compasso_e_ou_prumo = true;
            break;
          }
          case "colmeia_e_ou_abelhas": {
            this.list.push("Colmeia e/ou Abelhas");
            this.colmeia_e_ou_abelhas = true;
            break;
          }
          case "sol_radiado": {
            this.list.push("Sol radiado");
            this.sol_radiado = true;
            break;
          }
          case "águas_primordiais": {
            this.list.push("Águas primordiais");
            this.aguas_primordiais = true;
            break;
          }
          case "chão_axadrezado": {
            this.list.push("Chão axadrezado");
            this.chao_axadrezado = true;
            break;
          }
          case "superfície_axadrezada": {
            this.list.push("Superfície axadrezada");
            this.superficie_axadrezada = true;
            break;
          }
          case "três_degraus": {
            this.list.push("Três degraus");
            this.tres_degraus = true;
            break;
          }
          case "escrita_cifrada": {
            this.list.push("Escrita cifrada");
            this.escrita_cifrada = true;
            break;
          }
          case "estrela_de_cinco_pontas": {
            this.list.push("Estrela de cinco pontas");
            this.estrela_de_cinco_pontas = true;
            break;
          }
          case "duas_colunas": {
            this.list.push("Duas colunas");
            this.duas_colunas = true;
            break;
          }
          case "romãs": {
            this.list.push("Romãs");
            this.romas = true;
            break;
          }
          case "malhete": {
            this.list.push("Malhete");
            this.malhete = true;
            break;
          }
          case "colar": {
            this.list.push("Colar");
            this.colar = true;
            break;
          }
          case "forma_piramidal": {
            this.list.push("Forma piramidal");
            this.forma_piramidal = true;
            break;
          }
          case "lágrimas_invertidas": {
            this.list.push("Lágrimas invertidas");
            this.lagrimas_invertidas = true;
            break;
          }
          case "aperto_de_mão": {
            this.list.push("Aperto de mão");
            this.aperto_de_mao = true;
            break;
          }
          case "folhas_de_acácia": {
            this.list.push("Folhas de acácia");
            this.folhas_de_acacia = true;
            break;
          }
          case "águia_bicéfala": {
            this.list.push("Águia bicéfala");
            this.aguia_bicefala = true;
            break;
          }
          case "simulação_de_templo": {
            this.list.push("Simulação de templo");
            this.simulacao_de_templo = true;
            break;
          }
          case "elementos_simbolicos_other": {
            this.list.push("Outro");
            this.elementos_simbolicos_other = true;
            break;
          }
        }
      }
      // @ts-ignore
      let arquiteto = b['feature']['attributes']['arquiteto'];
      this.monumento._arquiteto = arquiteto;
      if (arquiteto == null) {
        this.monumento._arquiteto = "Sem Dados";
      }
      // @ts-ignore
      let construtor = b['feature']['attributes']['construtor'];
      this.monumento._construtor = construtor;
      if (construtor == null) {
        this.monumento._construtor = "Sem Dados";
      }
      // @ts-ignore
      let quem_mandou_construir = b['feature']['attributes']['quem_mandou_construir'];
      this.monumento._quemMandouConstruir = quem_mandou_construir;
      if (quem_mandou_construir == null) {
        this.monumento._quemMandouConstruir = "Sem Dados";
      }
      // @ts-ignore
      let epitafios = b['feature']['attributes']['epitafios'];
      if (epitafios == null) {
        epitafios = "Sem Dados";
      }
      this.monumento._epitafios = epitafios;
      // @ts-ignore
      let benemeritos_e_mecenas = b['feature']['attributes']['benemeritos_e_mecenas'];
      if (benemeritos_e_mecenas == null) {
        benemeritos_e_mecenas = "Sem Dados";
      }
      this.monumento._benemeritos_e_mecenas = benemeritos_e_mecenas;
      // @ts-ignore
      let outros_elementos_escritos = b['feature']['attributes']['outros_elementos_escritos'];
      if (outros_elementos_escritos == null) {
        outros_elementos_escritos = "Sem Dados";
      }
      this.monumento._outros_elementos_escritos = outros_elementos_escritos;
      // @ts-ignore
      let confrontacao = b['feature']['attributes']['confrontacao'];
      if (confrontacao == null) {
        confrontacao = "Sem Dados";
      }
      this.monumento._confrontacao = confrontacao;
      // @ts-ignore
      let leitura_simbolica = b['feature']['attributes']['leitura_simbolica'];
      if (leitura_simbolica == null) {
        leitura_simbolica = "Sem Dados";
      }
      this.monumento._leitura_simbolica = leitura_simbolica;
      // @ts-ignore
      let biografia_1_personalidade_no_ja = b['feature']['attributes']['biografia_1_personalidade_no_ja'];
      if (biografia_1_personalidade_no_ja == null) {
        biografia_1_personalidade_no_ja = "Sem Dados";
      }
      this.monumento._biografia_1 = biografia_1_personalidade_no_ja;
      // @ts-ignore
      let biografia_2_personalidade_no_ja = b['feature']['attributes']['biografia_2_personalidade_no_ja'];
      if (biografia_2_personalidade_no_ja == null) {
        biografia_2_personalidade_no_ja = "Sem Dados";
      }
      this.monumento._biografia_2 = biografia_2_personalidade_no_ja
      // @ts-ignore
      let biografia_3_personalidade_no_ja = b['feature']['attributes']['biografia_3_personalidade_no_ja'];
      if (biografia_3_personalidade_no_ja == null) {
        biografia_3_personalidade_no_ja = "Sem Dados";
      }
      this.monumento._biografia_3 = biografia_3_personalidade_no_ja;
      // @ts-ignore
      let biografia_4_personalidade_no_ja = b['feature']['attributes']['biografia_4_personalidade_no_ja'];
      // @ts-ignore
      if (biografia_4_personalidade_no_ja == null) {
        biografia_4_personalidade_no_ja = "Sem Dados";
      }
      this.monumento._biografia_4 = biografia_4_personalidade_no_ja;
      // @ts-ignore
      let biografia_5_personalidade_no_ja = b['feature']['attributes']['biografia_5_personalidade_no_ja'];
      if (biografia_5_personalidade_no_ja == null) {
        biografia_5_personalidade_no_ja = "Sem Dados";
      }
      this.monumento._biografia_5 = biografia_5_personalidade_no_ja;
      // @ts-ignore
      let outras = b['feature']['attributes']['outras'];
      if (outras == null) {
        outras = "Sem Dados";
      }
      this.monumento._outras = outras;
      // @ts-ignore
      let n_do_processo = b['feature']['attributes']['n_do_processo'];
      if (n_do_processo == null) {
        n_do_processo = "Sem Dados";
      }
      this.monumento._n_do_processo = n_do_processo;
      // @ts-ignore
      let alteracoes_obras_e_manutencao = b['feature']['attributes']['alteracoes_obras_e_manutencao'];
      if (alteracoes_obras_e_manutencao == null) {
        alteracoes_obras_e_manutencao = "Sem Dados";
      }
      this.monumento._alteracoes_obras_e_manutencao = alteracoes_obras_e_manutencao;
      // @ts-ignore
      let mudanca_de_posse = b['feature']['attributes']['mudanca_de_posse'];
      if (mudanca_de_posse == null) {
        mudanca_de_posse = "Sem Dados";
      }
      this.monumento._mudancaPosse = mudanca_de_posse;
      // @ts-ignore
      let outros_elementos_descritivos = b['feature']['attributes']['outros_elementos_descritivos'];
      if (outros_elementos_descritivos == null) {
        outros_elementos_descritivos = "Sem Dados";
      }
      this.monumento._outros_elementos_descritivos = outros_elementos_descritivos;
      // @ts-ignore
      let sepultados = b['feature']['attributes']['sepultados'];
      if (sepultados == null) {
        sepultados = "Sem Dados";
      }
      this.monumento._sepultados = sepultados;
      // @ts-ignore
      let elementos_simbolicos_other = b['feature']['attributes']['elementos_simbolicos_other'];
      if (elementos_simbolicos_other == null) {
        elementos_simbolicos_other = "Sem Dados";
      }
      this.monumento._elementos_simbolicos_other = elementos_simbolicos_other;
      // @ts-ignore
      let x = b['feature']['geometry']['x'];
      this.monumento._myX = x;
      // @ts-ignore
      let y = b['feature']['geometry']['y'];
      this.monumento._myY = y;
      // @ts-ignore
      this.monumentos.push(monumento);
    } catch (ex) {

    }
    this.spinner.hide();
    this.formGroup = new FormGroup(
      {
        nomeMonumento: new FormControl(this.monumento._nomeMonumento),
        rua: new FormControl(this.monumento._rua),
        numeroRua: new FormControl(this.monumento._numeroRua),
        //Tipologia, escolha
        //Elementos Simbolicos, escolha
        arquiteto: new FormControl(this.monumento._arquiteto),
        construtor: new FormControl(this.monumento._construtor),
        quem_mandou_construir: new FormControl(this.monumento._quemMandouConstruir),
        epitafios: new FormControl(this.monumento._epitafios),
        benemeritos_e_mecenas: new FormControl(this.monumento._benemeritos_e_mecenas),
        outros_elementos_escritos: new FormControl(this.monumento._outros_elementos_descritivos),
        confrontacao: new FormControl(this.monumento._confrontacao),
        leitura_simbolica: new FormControl(this.monumento._leitura_simbolica),
        biografia_1_personalidade_no_ja: new FormControl(this.monumento._biografia_1),
        biografia_2_personalidade_no_ja: new FormControl(this.monumento._biografia_2),
        biografia_3_personalidade_no_ja: new FormControl(this.monumento._biografia_3),
        biografia_4_personalidade_no_ja: new FormControl(this.monumento._biografia_4),
        biografia_5_personalidade_no_ja: new FormControl(this.monumento._biografia_5),
        outras: new FormControl(this.monumento._outras),
        n_do_processo: new FormControl(this.monumento._n_do_processo),
        alteracoes_obras_e_manutencao: new FormControl(this.monumento._alteracoes_obras_e_manutencao),
        mudanca_de_posse: new FormControl(this.monumento._mudancaPosse),
        outros_elementos_descritivos: new FormControl(this.monumento._outros_elementos_descritivos),
        sepultados: new FormControl(this.monumento._sepultados),
        // x y
      }
    );

  }


  async getToken() {
    let i = ""
    let body = new HttpParams().set('client_id', 'XXScCjKChAwLaplj').set('client_secret', 'd32e344e3b144845a07d75fef9cd9b9e').set('grant_type', 'client_credentials');
    let response: Promise<Object> = this.http.post('https://www.arcgis.com/sharing/rest/oauth2/token', body).toPromise();
    return response;
  }

  async getMonumentos(num: number) {
    let i = ""
    let body = new HttpParams().set('f', 'json').set('token', this.token.toString());
    let url = 'https://services-eu1.arcgis.com/kJpwBKPhHXDuJncY/arcgis/rest/services/survey123_1278669bc6f64f089d84969cb31c3aa7/FeatureServer/survey/' + num;
    let response: Promise<Object> = this.http.post(url, body).toPromise();
    return response;
  }

  onSubmit() {
    console.log(this.formGroup.value)
    this.editMonumento()
  }

  editMonumento() {
    console.log(this.formGroup.value['nomeMonumento'])
    var stringTipologia = ""
    if (this.sepulturaPerpetuaCheck) {
      stringTipologia += "sepultura_perpétua,"
    }
    if (this.monumentoCheck) {
      stringTipologia += "monumento,"
    }
    if (this.jazigoSubterraneoCheck) {
      stringTipologia += "jazigo_subterrâneo,"
    }
    if (this.jazigoCapelaCheck) {
      stringTipologia += "jazigo_capela,"
    }
    const stringTipologiaFinal = stringTipologia.slice(0, -1)
    console.log(stringTipologiaFinal)

    var stringElementos = ""
    if (this.triangulo_simples) {
      stringElementos += "triângulo_simples,"
    }
    if (this.triangulo_solarizado) {
      stringElementos += "triângulo_solarizado,"
    }
    if (this.triangulo_com_olho) {
      stringElementos += "triângulo_com_olho,"
    }
    if (this.triangulos_no_arranjo_e_decorac) {
      stringElementos += "triângulos_no_arranjo_e_decoraç,"
    }
    if (this.repeticoes_geometricas_de_figur) {
      stringElementos += "repetições_geométricas_de_figur,"
    }
    if (this.esquadro_compasso_e_ou_prumo) {
      stringElementos += "esquadro_compasso_e_ou_prumo,"
    }
    if (this.colmeia_e_ou_abelhas) {
      stringElementos += "colmeia_e_ou_abelhas,"
    }
    if (this.sol_radiado) {
      stringElementos += "sol_radiado,"
    }
    if (this.aguas_primordiais) {
      stringElementos += "águas_primordiais,"
    }
    if (this.chao_axadrezado) {
      stringElementos += "chão_axadrezado,"
    }
    if (this.superficie_axadrezada) {
      stringElementos += "superfície_axadrezada,"
    }
    if (this.tres_degraus) {
      stringElementos += "três_degraus,"
    }
    if (this.escrita_cifrada) {
      stringElementos += "escrita_cifrada,"
    }
    if (this.estrela_de_cinco_pontas) {
      stringElementos += "estrela_de_cinco_pontas,"
    }
    if (this.duas_colunas) {
      stringElementos += "duas_colunas,"
    }
    if (this.romas) {
      stringElementos += "romãs,"
    }
    if (this.malhete) {
      stringElementos += "malhete,"
    }
    if (this.colar) {
      stringElementos += "colar,"
    }
    if (this.forma_piramidal) {
      stringElementos += "forma_piramidal,"
    }
    if (this.lagrimas_invertidas) {
      stringElementos += "lágrimas_invertidas,"
    }
    if (this.aperto_de_mao) {
      stringElementos += "aperto_de_mão,"
    }
    if (this.folhas_de_acacia) {
      stringElementos += "folhas_de_acácia,"
    }
    if (this.aguia_bicefala) {
      stringElementos += "águia_bicéfala,"
    }
    if (this.simulacao_de_templo) {
      stringElementos += "simulação_de_templo,"
    }
    if (this.elementos_simbolicos_other) {
      stringElementos += "elementos_simbolicos_other,"
    }


    const stringElementosFinal = stringElementos.slice(0, -1)
    console.log(stringElementosFinal)

    let edits = "[\n" +
      "  {\n" +
      "    \"attributes\" : {\n" +
      "      \"objectid\": " + this.monumento._id + ",\n" +
      "      \"rua\": \"" + this.formGroup.value['rua'] + "\",\n" +
      "      \"nomeMonumento\": \"" + this.formGroup.value['nomeMonumento'] + "\",\n" +
      "      \"numero_da_rua\": \"" + this.formGroup.value['numeroRua'] + "\",\n" +
      "      \"tipologia\": \"" + stringTipologiaFinal + "\",\n" +
      "      \"elementos_simbolicos\": \"" + stringElementosFinal + "\",\n" +
      "      \"arquiteto\": \"" + this.formGroup.value['arquiteto'] + "\",\n" +
      "      \"construtor\": \"" + this.formGroup.value['construtor'] + "\",\n" +
      "      \"quem_mandou_construir\": \"" + this.formGroup.value['quem_mandou_construir'] + "\",\n" +
      "      \"epitafios\": \"" + this.formGroup.value['epitafios'] + "\",\n" +
      "      \"benemeritos_e_mecenas\": \"" + this.formGroup.value['benemeritos_e_mecenas'] + "\",\n" +
      "      \"outros_elementos_escritos\": \"" + this.formGroup.value['outros_elementos_escritos'] + "\",\n" +
      "      \"confrontacao\": \"" + this.formGroup.value['confrontacao'] + "\",\n" +
      "      \"biografia_1_personalidade_no_ja\": \"" + this.formGroup.value['biografia_1_personalidade_no_ja'] + "\",\n" +
      "      \"biografia_2_personalidade_no_ja\": \"" + this.formGroup.value['biografia_2_personalidade_no_ja'] + "\",\n" +
      "      \"biografia_3_personalidade_no_ja\": \"" + this.formGroup.value['biografia_3_personalidade_no_ja'] + "\",\n" +
      "      \"biografia_4_personalidade_no_ja\": \"" + this.formGroup.value['biografia_4_personalidade_no_ja'] + "\",\n" +
      "      \"biografia_5_personalidade_no_ja\": \"" + this.formGroup.value['biografia_5_personalidade_no_ja'] + "\",\n" +
      "      \"outras\": \"" + this.formGroup.value['outras'] + "\",\n" +
      "      \"n_do_processo\": \"" + this.formGroup.value['n_do_processo'] + "\",\n" +
      "      \"alteracoes_obras_e_manutencao\": \"" + this.formGroup.value['alteracoes_obras_e_manutencao'] + "\",\n" +
      "      \"mudanca_de_posse\": \"" + this.formGroup.value['mudanca_de_posse'] + "\",\n" +
      "      \"outros_elementos_descritivos\": \"" + this.formGroup.value['outros_elementos_descritivos'] + "\",\n" +
      "      \"sepultados\": \"" + this.formGroup.value['sepultados'] + "\"\n" +
      "    }\n" +
      "  }\n" +
      "]\n"
    console.log(edits)

    let i = ""
    let body = new HttpParams().set('f', 'json').set('token', this.token.toString()).set('updates', edits);
    let response: Promise<Object> = this.http.post('https://services-eu1.arcgis.com/kJpwBKPhHXDuJncY/arcgis/rest/services/survey123_1278669bc6f64f089d84969cb31c3aa7_stakeholder/FeatureServer/0/applyEdits', body).toPromise();
    return response;

  }


   clickMethod(){

   }

  showPosition(){

  }


}
