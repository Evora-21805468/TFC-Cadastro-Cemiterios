export interface IUserRegisto{
  email?: string;
  password?: string;
  primeiroNome?: string;
  segundoNome?: string;
  numeroTelemovel?: string;

}

export class UserRegisto implements  IUserRegisto{
  constructor(
    email?: string,
    password?: string,
    primeiroNome?: string,
    segundoNome?: string,
    numeroTelemovel?: string,
  ) {
  }
}

