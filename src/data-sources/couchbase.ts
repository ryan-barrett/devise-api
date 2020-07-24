import config from 'config';
import { Cluster } from 'couchbase';
import type { CbConnectionUrl, Id, CouchbaseConnectionOptions, QueryResult } from '../types';

const couchbaseConfig: any = config.get('couchbaseConfig');
const { couchbaseUrl, cbUsername, cbPassword, defaultBucket } = couchbaseConfig;

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
    return await this.connection.query(`SELECT COUNT(*) FROM ${defaultBucket}`);
  }
}

export const connection = new CouchbaseConnection(couchbaseUrl, {
  username: cbUsername,
  password: cbPassword,
});
