import * as dotenv from 'dotenv';
import { MongoClient } from "mongodb";

import glob from 'glob';

dotenv.config();

const url = `mongodb+srv://adm:${process.env.MONGODB_PASS}@search-engine-db.q0ish8y.mongodb.net/?retryWrites=true&w=majority`;
const dbName = 'search-engine-db';

function format_search(search_term: string) {
    const new_string: string = search_term.split('').join('.*');

    return new_string;
}

async function createDB() {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    const collections = ['manga', 'novel', 'webtoon', 'anime', 'test'];

    let collection = db.collection(`${collections[0]}`);
    console.log(`----- Fetching ${collections[0]}... -----`);    

    await Promise.all([
        glob.sync(`../crawlers/manga/**/output.json`).forEach(file => {
            collection.insertMany(JSON.parse(file));
        })
    ]);

    collection = db.collection(`${collections[1]}`);
    console.log(`----- Fetching ${collections[1]}... -----`);
    
    await Promise.all([]);
    
    collection = db.collection(`${collections[2]}`);
    console.log(`----- Fetching ${collections[2]}... -----`);
    
    await Promise.all([]);
    
    collection = db.collection(`${collections[3]}`);
    console.log(`----- Fetching ${collections[3]}... -----`);

    await Promise.all([]);
    
    client.close();
}

async function deleteDB() {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    
    const collections = ['manga', 'novel', 'webtoon', 'anime', 'test'];
    
    console.log('Started deleting...');
    
    for (let i = 0; i < collections.length; i++) {
        let collection = db.collection(collections[i]);
        await collection.deleteMany({});
        console.log('Deleted ' + collections[i].replace(/^\w/, (c: string) => c.toUpperCase()) + '...');
    }
    
    console.log('Deleting collections DONE');
    client.close();
}

async function searchDB(search_term: string) {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("manga");
    
    console.log(`Searching for ${search_term}...`);
    
    const result = await collection.find(
        { "title": { $regex: `.*${search_term.toLowerCase()}.*` } },
        { projection: { _id: 0 } }
    ).toArray();
    
    client.close();
    
    return result;
}

export { searchDB };