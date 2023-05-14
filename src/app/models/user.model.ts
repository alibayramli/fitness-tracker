export interface IUser {
  displayName: string;
  email: string;
  isAdmin: boolean;
}

export class User implements IUser {
  displayName!: string;
  email!: string;
  isAdmin = false;
  constructor(values?: Partial<IUser>) {
    Object.assign(this, values);
  }
}
