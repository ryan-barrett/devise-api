import { EventEmitter, once } from 'events';
import { v4 as uuidv4 }       from 'uuid';
import * as Services          from './services';
import { logger }             from './utils/logger';

export class Application {
  private readonly _emitter: any;
  private readonly _servers: Array<any>;
  private readonly _serviceMap: any;

  constructor(servers: Array<any>) {
    this._emitter = new EventEmitter();
    this._servers = servers;
    this._serviceMap = Application.BuildServiceMap(Services);
    this._emitter.on('event', this.digest.bind(this));
  }

  public async start() {
    for (const server of this._servers) {
      server.start();
    }
  }

  public async stop() {
    for (const server of this._servers) {
      server.stop();
    }
  }

  public async callService(service: string, method: string, args: Array<any>, user?: { [key: string]: string | Array<string> }) {
    logger.info({ service, method, args }, 'calling service');
    const response = await this.emitAwait(`${service}:${method}`, args, user);
    if (response._code && response.code > 299) {
      throw response;
    }
    return response;
  }

  private async emitAwait(event: string, args: any, user?: { [key: string]: string | Array<string> }) {
    const [service, functionName] = event.split(':');
    const eventId = uuidv4();
    this._emitter.emit('event', eventId, service, functionName, args, user);
    const [value] = await once(this._emitter, eventId);
    return value;
  }

  private async digest(eventId: string, service: string, functionName: any, functionArgs: any, user?: { [key: string]: string | Array<string> }) {
    try {
      if (this._serviceMap[service]) {
        const response = await (new this._serviceMap[service](user))[functionName](...functionArgs);
        this._emitter.emit(eventId, response);
      }
    }
    catch (error) {
      this._emitter.emit(eventId, error);
    }
  }

  private static BuildServiceMap(services: any) {
    const serviceMap: any = {};
    const keys = Object.keys(services);

    for (let i = 0; i < keys.length; i++) {
      serviceMap[keys[i]] = services[keys[i]];
    }
    return serviceMap;
  }
}
