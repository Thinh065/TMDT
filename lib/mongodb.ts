import { MongoClient, type MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'sole_store';
const useMockData = process.env.USE_MOCK_DATA === 'true';
const mongoOptions: MongoClientOptions = {
  serverSelectionTimeoutMS: 3000,
  connectTimeoutMS: 3000,
  socketTimeoutMS: 3000,
  tls: true,
  family: 4,
  appName: process.env.MONGODB_APP_NAME ?? 'SOLE Store App',
};

let cachedClient: MongoClient | null = null;
let cachedPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createMongoClient() {
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables.');
  }

  return new MongoClient(uri, mongoOptions);
}

export async function getMongoClient() {
  if (useMockData) {
    throw new Error('MongoDB is disabled because USE_MOCK_DATA=true.');
  }

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables.');
  }

  if (!cachedPromise) {
    const client = createMongoClient();
    cachedClient = client;

    if (process.env.NODE_ENV === 'development') {
      if (!global._mongoClientPromise) {
        global._mongoClientPromise = client.connect();
      }
      cachedPromise = global._mongoClientPromise;
    } else {
      cachedPromise = client.connect();
    }
  }

  return cachedPromise;
}

export async function getDatabase() {
  const client = await getMongoClient();
  return client.db(dbName);
}
