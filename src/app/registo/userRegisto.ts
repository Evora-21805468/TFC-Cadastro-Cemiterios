export interface IUserRegisto{
  email?: string;
  password?: string;
  nome?: string;
  isAdmin?: boolean;
}

export class UserRegisto implements  IUserRegisto{
  constructor(
    email?: string,
    password?: string,
    nome?: string,
    isAdmin?: boolean
  ) {
  }
}

