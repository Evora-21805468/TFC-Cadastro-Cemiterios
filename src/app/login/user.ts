export interface IUser{
  email?: string;
  password?: string;
}

export class User implements  IUser{
  constructor(
    email?: string,
    password?: string
  ) {
  }
}

