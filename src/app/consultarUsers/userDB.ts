export interface IUserDB{
  uid?: string;
  email?: string;
  nome?: string;
  isAdmin?: boolean;
}

export class UserDB implements  IUserDB{

  constructor(
    uid?: string,
    email?: string,
    nome?: string,
    isAdmin?: boolean
  ) {
  }
}
