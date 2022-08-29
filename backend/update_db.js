require('dotenv').config();
const { MongoClient } = require("mongodb");
const brmangas_scraper = require('./crawlers/brmangas_scraper');
const mangahost_scraper = require('./crawlers/mangahost_scraper');
const mangatoon_scraper = require('./crawlers/mangatoon_scraper');

const url = `mongodb+srv://adm:${process.env.MONGODB_PASS}@search-engine-db.sullvzo.mongodb.net/?retryWrites=true&w=majority`;
const dbName = 'search-engine-db';

async function updateDB() {
    brmangas_scraper();
    mangahost_scraper();
    mangatoon_scraper();
}

updateDB();