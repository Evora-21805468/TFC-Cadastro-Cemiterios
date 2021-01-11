export interface IUserDB{
  id?: string;
  email?: string;
  nome?: string;
  isAdmin?: boolean;
}

export class UserDB implements  IUserDB{

  constructor(
    id?: string,
    email?: string,
    nome?: string,
    isAdmin?: boolean
  ) {
  }
}

