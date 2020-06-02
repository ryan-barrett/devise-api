import { Cluster } from 'couchbase';
import { id } from 'aws-sdk/clients/datapipeline';

interface CouchbaseConnectionOptions {
  username: string;
  password: string;
}

type CbConnectionUrl = string;

type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[];

interface QueryResult {
  meta: Json;
  rows: Array<Json>;
}

interface CouchbaseConnection {
  new(url: CbConnectionUrl, options: CouchbaseConnectionOptions): CouchbaseConnection;
}

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

  async get(key: id) {
    return await this.collection.get(key);
  }

  async count(): Promise<QueryResult> {
    return await this.connection.query(`SELECT COUNT(*) FROM b`); // TODO: paramterize bucket
  }
}

const couchbaseUrl = process.env.COUCHBASE_URL || '8091';
export const connection = new CouchbaseConnection(couchbaseUrl, {
  username: 'Administrator',
  password: 'samick92',
});

export type {
  Json,
  CbConnectionUrl,
};
