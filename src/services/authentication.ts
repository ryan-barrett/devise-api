import { Service }                  from './service';
import { AuthenticationController } from '../controllers';
import { ServiceError }             from '../errors';


class AuthenticationServiceError extends ServiceError {
}

export class AuthenticationService extends Service {
  constructor(...args: any) {
    super(...args);
  }

  async login(email: string, password: string) {
    const user = await AuthenticationController.MatchUser(email);
    const validPassword = await AuthenticationController.VerifyPassword(user, password);

    if (validPassword) {
      const jwt = AuthenticationController.GenerateJwt(user);
      return { jwt };
    }
    throw new AuthenticationServiceError(401, 'invalid login credentials');
  }
}
