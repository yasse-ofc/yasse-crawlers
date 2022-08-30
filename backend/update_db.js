require('dotenv').config();
const { MongoClient } = require("mongodb");

// MANGA
const brmangas_scraper = require('./crawlers/brmangas_scraper');
const mangahost_scraper = require('./crawlers/mangahost_scraper');
const mangatoon_scraper = require('./crawlers/mangatoon_scraper');
const manganato_scraper = require('./crawlers/manganato_scraper');

const url = `mongodb+srv://adm:${process.env.MONGODB_PASS}@search-engine-db.sullvzo.mongodb.net/?retryWrites=true&w=majority`;
const dbName = 'search-engine-db';

async function updateDB() {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    let collection = db.collection("manga");
    
    // MANGA
    await collection.insertMany(brmangas_scraper());
    await collection.insertMany(mangahost_scraper());
    await collection.insertMany(mangatoon_scraper());
    await collection.insertMany(manganato_scraper());

    collection = db.collection("novel");

    // NOVEL

    collection = db.collection("anime");

    // ANIME

    collection = db.collection("webtoon");

    // WEBTOON
}

updateDB();