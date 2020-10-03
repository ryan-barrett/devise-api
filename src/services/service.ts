export class Service {
  private readonly _user: { [key: string]: string | Array<string> } | undefined;

  constructor(user?: { [key: string]: string | Array<string> }) {
    this._user = user;
  }

  public get user() {
    return this._user;
  }
}
