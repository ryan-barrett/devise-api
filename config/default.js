module.exports = {
  port: process.env.PORT || '8080',
  'couchbaseConfig': {
    couchbaseUrl: process.env.COUCHBASE_URL || 'localhost:8091',
    'defaultBucket': process.env.DEFAULT_BUCKET || 'b',
    cbUsername: process.env.CB_USERNAME || '',
    cbPassword: process.env.CB_PASSWORD || '',
  },
  jwt: {
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
  },
  encryption: {
    saltRounds: 10,
  }
};
