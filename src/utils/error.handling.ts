export class RequestError extends Error {
  name = 'RequestError';
  statusCode: number;

  constructor(message: string | undefined, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ServerError extends Error {
  name = 'ServerError';
  statusCode: number;

  constructor(message: string | undefined, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
