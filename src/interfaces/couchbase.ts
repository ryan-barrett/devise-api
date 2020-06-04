import type { Json } from '../types/appTypes';
import { CbConnectionUrl } from '../types/appTypes';

export interface CouchbaseConnectionOptions {
  username: string;
  password: string;
}

export interface QueryResult {
  meta: Json;
  rows: Array<Json>;
}

export interface CouchbaseConnection {
  new(url: CbConnectionUrl, options: CouchbaseConnectionOptions): CouchbaseConnection;
}
