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

  public async login(email: string, password: string) {
    logger.info({ email }, 'logging in');
    const user = await AuthenticationController.MatchUser(email);
    const validPassword = await AuthenticationController.VerifyPassword(user, password);

    if (validPassword) {
      const jwt = AuthenticationController.GenerateJwt(user);
      logger.info({ email }, 'sending jwt');
      return { jwt };
    }
    throw new AuthenticationServiceError(401, 'invalid login credentials');
  }

  public async parseJwt(jwtToken: string) {
    return AuthenticationController.ParseJwt(jwtToken);
  }
}
