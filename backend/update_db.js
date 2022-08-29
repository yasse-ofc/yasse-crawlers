const brmangas_scraper = require('./brmangas_scraper');
const mangahost_scraper = require('./mangahost_scraper');
const mangatoon_scraper = require('./mangatoon_scraper');

async function updateDB() {
    brmangas_scraper();
    mangahost_scraper();
    mangatoon_scraper();
}

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