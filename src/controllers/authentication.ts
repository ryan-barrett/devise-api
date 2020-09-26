import jwt                                   from 'jsonwebtoken';
import config                                from 'config';
import { UserModel }                         from '../models';
import { ControllerError }                   from '../errors';
import type { UserId, UserData, User, Json } from '../types';

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
}
