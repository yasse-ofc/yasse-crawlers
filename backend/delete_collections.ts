import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const url = process.env.MONGODB_LINK ?? '';
const dbName = 'yasse';

const client = await MongoClient.connect(url);
const db = client.db(dbName);

const collections = [
  'manga',
  'novel',
  'webtoon',
  'anime',
  'test'
];

for (let i = 0; i < collections.length; i++) {
  const collection = db.collection(collections[i]);
  await collection.deleteMany({});
}

client.close();
