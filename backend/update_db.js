const dotenv = require('dotenv').config();
const { MongoClient } = require("mongodb");

const glob = require('glob');
const path = require('path');

// REQUIRES CRAWLERS
glob.sync('./crawlers/**/*.js').forEach(file => {
    require(path.resolve(file));
});

const url = `mongodb+srv://adm:${process.env.MONGODB_PASS}@search-engine-db.q0ish8y.mongodb.net/?retryWrites=true&w=majority`;
const dbName = 'search-engine-db';

async function createDB() {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    const collections = ['manga', 'novel', 'webtoon', 'anime', 'test'];

    let collection = db.collection(`${collections[0]}`);
    console.log(`----- Fetching ${collections[0]}... -----`);
    
    await Promise.all([
        //brmangas_scraper(collection),
        //manganato_scraper(collection),
        //mangahost_scraper(collection),
        //mangalivre_scraper(collection),
    ]);
    
    collection = db.collection(`${collections[1]}`);
    console.log(`----- Fetching ${collections[1]}... -----`);
    
    await Promise.all([]);
    
    collection = db.collection(`${collections[2]}`);
    console.log(`----- Fetching ${collections[2]}... -----`);
    
    await Promise.all([]);
    
    collection = db.collection(`${collections[3]}`);
    console.log(`----- Fetching ${collections[3]}... -----`);

    await Promise.all([
        //animeplanet_scraper(collection),
    ]);
    
    client.close();
}

async function deleteDB() {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    
    collections = ['manga', 'novel', 'webtoon', 'anime', 'test'];
    
    console.log('Started deleting...');
    
    for (let i = 0; i < collections.length; i++) {
        let collection = db.collection(collections[i]);
        await collection.deleteMany({});
        console.log('Deleted ' + collections[i].replace(/^\w/, c => c.toUpperCase()) + '...');
    }
    
    console.log('Deleting collections DONE');
    client.close();
}

async function searchDB(search_term) {
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

if (process.argv[2] == 'create') createDB();
else if (process.argv[2] == 'delete') deleteDB();
else if (process.argv[2] == 'search') searchDB(process.argv[3]);

module.exports = { searchDB };