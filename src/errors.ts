import { GraphQLError } from 'graphql';
import { logger } from './utils/logger';

export class BaseError extends GraphQLError {
  protected _code: number;
  protected _originalError?: Error;

  constructor(code: number, message: string, originalError?: Error) {
    super(message);
    this._code = code;
    this._originalError = originalError;
  }

  get type() {
    return this.constructor.name;
  }

  get code() {
    return this._code;
  }

  public logError() {
    logger.error({ event: this }, this.message);
  }

  public serialize() {
    this.logError();

    return {
      type: this.type,
      code: this._code,
      message: this.message,
    };
  }
}

export class ControllerError extends BaseError {
  constructor(code: number, message: string, originalError?: Error) {
    super(code, message, originalError);
  }
}

export class ModelError extends BaseError {
  constructor(code: number, message: string, originalError?: Error) {
    super(code, message, originalError);
  }
}

export class ServiceError extends BaseError {
  constructor(code: number, message: string, originalError?: Error) {
    super(code, message, originalError);
  }
}

export function customFormatErrorFn(error: any) { // TODO: rename this?
  try {
    return error.originalError.serialize();
  }
  catch (e) {
    return new ServiceError(500, 'server error', error).serialize();
  }
}
