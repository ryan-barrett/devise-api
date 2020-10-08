import { app }    from './index';
import { logger } from './utils/logger';

/**
 * the functions in this file are handlers for regular (non graphql) express routes. Generally they will sit above the
 * jwt validation middleware to allow users to login / create a user without having a jwt token
 */

export async function login(req: any, res: any) {
  const { params } = req;
  const { email, password } = params;
  try {
    res.json(await app.callService('AuthenticationService', 'login', [email, password]));
  }
  catch (error) {
    logger.error({ error }, 'error logging in');
    return res.status(401).send({ message: 'invalid credentials' });
  }
}

export async function createUser(req: any, res: any) {
  const { body } = req;
  const { userName, password, email } = body;
  const userData = { userName, password, email };
  try {
    const newUser = await app.callService('UserService', 'create', [userData]);
    res.json({
      id: newUser.id,
      email: newUser.email,
      userName: newUser.userName,
      board: newUser.boards,
    });
  }
  catch (error) {
    logger.error({ error }, 'error creating user');
    return res.status(400).send({ message: 'error creating user' });
  }
}
