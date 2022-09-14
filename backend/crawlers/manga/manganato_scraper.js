module.exports = manganato_scraper;

const axios = require('axios');
const cheerio = require('cheerio');
const mongodb = require("mongodb");
const UserAgent = require('user-agents');
const { manganato_session } = require('../../config/default_session');

const userAgent = new UserAgent();
const url_domain = 'https://manganato.com/genre-all/';

async function scrap_page(page, collection) {
    const session = manganato_session();
    const load_page = await session.get(url_domain + page)
    .then(response => cheerio.load(response.data))
    .catch((error) => console.log(`[-][MANGANATO] Error ${error.response.status} on page ${page}`));
    
    await collection.insertMany(load_page('.panel-content-genres .content-genres-item').map((page, el) => {
        const title = load_page(el).children().find('a').attr('title').toLowerCase();
        const href = load_page(el).children().find('a').attr('href');
        const img = load_page(el).children().find('a img').attr('src');
        const last_chapter = (load_page(el).find('.genres-item-chap').attr('href') == undefined) ? "" : load_page(el).find('.genres-item-chap').attr('href').split('/').pop().split('-').pop();
        
        return {
            'title': title,
            'href': href,
            'img': img,
            'last_chapter': last_chapter,
            'source': 'manganato',
        }
    }).get());
}

async function manganato_scraper(collection) {
    try {
        let i = 1;
        
        const session = manganato_session();
        const max_page_count = await session.get(url_domain + i)
            .then(response => parseInt(cheerio.load(response.data)('.group-page a')
                .eq(-1).attr('href').split('/').pop()))
            .catch((error) => console.log(`[-][MANGANATO] Error ${error.response.status} on page ${page}`));

        console.log('[+][MANGANATO] Getting Series...');
        
        while (i < max_page_count) {
            let promises = [];
            for (let j = i; j < i + 10 && j <= max_page_count; j++) promises.push(j);

            await Promise.all(promises.map(promise => scrap_page(promise, collection)));

            let page = (i + 9 > max_page_count) ? max_page_count : i + 9;
            console.log(`[+][MANGANATO] ${page}/${max_page_count} pages processed.`);

            i += 10;
        }

        console.log('[+][MANGANATO] Got All Series.');
        
    } catch (error) {
        console.log('[-][MANGANATO] Error.');
        throw error;
    }
}