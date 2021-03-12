
export class Monumento {
    _globalId: string = "";
   _id: string;
   _nomeMonumento: string = "";
   _rua: string = "";
   _numeroRua: string = "";
   _criadoPor: string = "";
   _tipologia: string = "";
   _elementosSimbolicos: string = "";
   _arquiteto: string = ""
  _construtor: string = ""
  _quemMandouConstruir: string = "";
   _epitafios: string = "";
  _benemeritos_e_mecenas: string = "";
  _outros_elementos_escritos: string = "";
  _confrontacao: string = "";
  _leitura_simbolica: string = "";
  _biografia_1: string = "";
  _biografia_2: string = "";
  _biografia_3: string = "";
  _biografia_4: string = "";
  _biografia_5: string = "";
  _outras: string = "";
  _n_do_processo: string = "";
  _alteracoes_obras_e_manutencao: string = "";
  _mudancaPosse: string = "";
  _outros_elementos_descritivos: string = "";
  _sepultados: string = "";
  _elementos_simbolicos_other: string = "";
   _myX: string = ""
    _myY: string = ""


  constructor(id: string, globalId: string) {
    this._id = id;
    this._globalId = globalId;
  }


}

