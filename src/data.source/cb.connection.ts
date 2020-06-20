import { Cluster } from 'couchbase';

import type { CbConnectionUrl, Id } from '../types';
import { CouchbaseConnectionOptions, QueryResult } from '../interfaces/couchbase';

class CouchbaseConnection {
  private connection: any;
  private bucket: any;
  private collection: any;

  constructor(url: CbConnectionUrl, options: CouchbaseConnectionOptions) {
    // @ts-ignore
    this.connection = new Cluster(url, options);
    this.bucket = this.connection.bucket('b');
    this.collection = this.bucket.defaultCollection();
  }

  async query(query: string): Promise<QueryResult> {
    return await this.connection.query(query);
  }

  async upsert(key: string, document: any) {
    return await this.collection.upsert(key, document);
  }

  async get(key: Id) {
    return await this.collection.get(key);
  }

  async count(): Promise<QueryResult> {
    return await this.connection.query(`SELECT COUNT(*) FROM b`); // TODO: paramterize bucket
  }
}

const couchbaseUrl = process.env.COUCHBASE_URL || '8091';
const cbUsername = process.env.CB_USERNAME || '';
const cbPassword = process.env.CB_PASSWORD || '';

export const connection = new CouchbaseConnection(couchbaseUrl, {
  username: cbUsername,
  password: cbPassword,
});
