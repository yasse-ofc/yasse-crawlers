const dotenv = require('dotenv').config();
const { MongoClient } = require("mongodb");

// MANGA
const brmangas_scraper = require('./crawlers/manga/brmangas_scraper');
const mangahost_scraper = require('./crawlers/manga/mangahost_scraper');
const manganato_scraper = require('./crawlers/manga/manganato_scraper');
const mangalivre_scraper = require('./crawlers/manga/mangalivre_scraper');

const url = `mongodb+srv://adm:${process.env.MONGODB_PASS}@search-engine-db.q0ish8y.mongodb.net/?retryWrites=true&w=majority`;
const dbName = 'search-engine-db';

async function createDB() {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    let collection = db.collection("manga");
    
    await manganato_scraper(collection);  // TEST THIS
    //await brmangas_scraper(collection);   // TEST THIS
    //await mangahost_scraper(collection);  // TEST THIS
    //await mangalivre_scraper(collection); // TESTED

    collection = db.collection("novel");

    collection = db.collection("anime");

    collection = db.collection("webtoon");

    client.close();
}

async function deleteDB() {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    
    collections = ['manga', 'novel', 'webtoon', 'anime'];
    
    console.log('Started deleting...');
    
    for (let i = 0; i < collections.length; i++) {
        let collection = db.collection(collections[i]);
        await collection.deleteMany({});
        console.log('Deleted ' + collections[i].replace(/^\w/, c => c.toUpperCase()) + '...');
    }
    
    console.log('Deleting collections DONE');
    client.close();
}

//createDB();
//deleteDB();