require('dotenv').config();
const { MongoClient } = require("mongodb");

const url = `mongodb+srv://adm:${process.env.MONGODB_PASS}@search-engine-db.sullvzo.mongodb.net/?retryWrites=true&w=majority`;
const dbName = 'search-engine-db';

let tags = {
    'language': 'pt', // It may be en as well
    'media': 'manga', // It may be anime, novel or webtoon as well
}

if (tags.language === 'pt') {
    if (tags.media === 'manga') {
    } else if (tags.media === 'anime') {

    } else if (tags.media === 'novel') {

    } else if (tags.media === 'webtoon') {

    }
} else if (tags.language === 'en') {
    if (tags.media === 'manga') {

    } else if (tags.media === 'anime') {

    } else if (tags.media === 'novel') {

    } else if (tags.media === 'webtoon') {

    }
}