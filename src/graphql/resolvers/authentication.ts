import { app } from '../../index';

export async function login({ input: { email, password } }: { [key: string]: { [key: string]: string } }) {
  return app.callService('AuthenticationService', 'login', [email, password]);
}
