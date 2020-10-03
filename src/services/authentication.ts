import { Service }                  from './service';
import { AuthenticationController } from '../controllers';
import { ServiceError }             from '../errors';
import { logger }                   from '../utils/logger';

class AuthenticationServiceError extends ServiceError {
}

export class AuthenticationService extends Service {
  constructor(user?: { [key: string]: string | Array<string> }) {
    super(user);
  }

  public static async Login(email: string, password: string) {
    logger.info({ email }, 'attempting to login');
    const user = await AuthenticationController.MatchUser(email);
    const validPassword = await AuthenticationController.VerifyPassword(user, password);

    if (validPassword) {
      const jwt = AuthenticationController.GenerateJwt(user);
      return { jwt };
    }
    throw new AuthenticationServiceError(401, 'invalid login credentials');
  }

  public static async ParseJwt(jwtToken: string) {
    return AuthenticationController.ParseJwt(jwtToken);
  }
}
