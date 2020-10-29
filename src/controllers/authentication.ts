import jwt                 from 'jsonwebtoken';
import bcrypt              from 'bcrypt';
import config              from 'config';
import { UserModel }       from '../models';
import { ControllerError } from '../errors';
import type { User }       from '../types';
import { logger }          from '../utils/logger';

const jwtConfig: { [key: string]: any } = config.get('jwt');
const { publicKey, privateKey } = jwtConfig;

class AuthenticationControllerError extends ControllerError {
}

export class AuthenticationController {
  public static async MatchUser(email: string) {
    return UserModel.Match(email);
  }

  public static GenerateJwt(user: User) {
    const filteredUser = { ...user };
    delete filteredUser.password;
    return jwt.sign(user, privateKey, { algorithm: 'RS256' });
  }

  public static VerifyPassword(user: User, password: string) {
    if (!user || !password) {
      logger.error({ user, password }, 'invalid arguments');
      throw new AuthenticationControllerError(500, 'VerifyPassword: invalid arguments');
    }
    return bcrypt.compare(password, user.password);
  }

  public static async ParseJwt(jwtToken: string) {
    const rawToken = jwtToken.substr(7, jwtToken.length);

    try {
      // @ts-ignore
      const { email, id, userName, boards } = await jwt.verify(rawToken, publicKey);
      return { email, id, userName, boards };
    }
    catch (error) {
      logger.error({ error }, 'error parsing jwt');
      return {};
    }
  }
}
