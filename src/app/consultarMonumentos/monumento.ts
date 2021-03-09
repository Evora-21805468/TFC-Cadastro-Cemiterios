
export class Monumento {
   _id: string;
   _nomeMonumento: string;
   _rua: string;
   _numeroRua: string;

  constructor(id: string, nomeMonumento: string, rua: string, numeroRua: string) {
    this._id = id;
    this._nomeMonumento = nomeMonumento;
    this._rua = rua;
    this._numeroRua = numeroRua;
  }


}

