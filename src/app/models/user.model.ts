export interface IUser {
  firstName: string;
  lastName: string;
  gender?: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export class User implements IUser {
  firstName!: string;
  lastName!: string;
  gender!: string;
  email!: string;
  password!: string;
  isAdmin = false;
  constructor(values?: Partial<IUser>) {
    Object.assign(this, values);
  }
}
