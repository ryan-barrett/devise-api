import { app } from '../../index';

export async function getUser(input: any, context: any) {
  const caller = context.user;
  const { userId } = input;
  return app.callService('UserService', 'get', [userId], caller);
}

export async function createUser(input: any, context: any) {
  const caller = context.user;
  const { userName, email, password } = input;
  const userData = { userName, email, password };
  return app.callService('UserService', 'create', [userData], caller);
}

export async function updateUser(args: any, context: any) {
  const caller = context.user;
  const { input } = args;
  const { id, userName, email, boards } = input;

  const userData = { id, userName, email, boards };
  return app.callService('UserService', 'update', [userData], caller);
}
