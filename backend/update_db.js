const dotenv = require('dotenv').config();
const { MongoClient } = require("mongodb");

// MANGA
const brmangas_scraper = require('./crawlers/manga/brmangas_scraper');
const mangahost_scraper = require('./crawlers/manga/mangahost_scraper');
const mangatoon_scraper = require('./crawlers/manga/mangatoon_scraper');
const manganato_scraper = require('./crawlers/manga/manganato_scraper');
const mangalivre_scraper = require('./crawlers/manga/mangalivre_scraper');

const url = `mongodb+srv://adm:${process.env.MONGODB_PASS}@search-engine-db.q0ish8y.mongodb.net/?retryWrites=true&w=majority`;
const dbName = 'search-engine-db';

async function updateDB() {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    let collection = db.collection("manga");
    
    // MANGA
    await mangalivre_scraper(collection);
    //await collection.insertMany(await mangalivre_scraper(collection));
    //await collection.insertMany(await brmangas_scraper());
    //await collection.insertMany(mangahost_scraper());
    //await collection.insertMany(mangatoon_scraper());
    //await collection.insertMany(manganato_scraper());

    collection = db.collection("novel");

    // NOVEL

    collection = db.collection("anime");

    // ANIME

    collection = db.collection("webtoon");

    // WEBTOON

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
        console.log('Deleted ' + collections[i] + '...');
    }
    
    console.log('Deleting collections DONE');
    client.close();
}

updateDB();
//deleteDB();