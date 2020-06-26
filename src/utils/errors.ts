import { GraphQLError } from 'graphql';

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

  public serialize() {
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


export function customFormatErrorFn<T extends BaseError>(error: any) {
  const err = {
    ...error.originalError.serialize(),
    locations: error.locations,
    path: error.path,
  };
  return error.originalError.serialize();
}
