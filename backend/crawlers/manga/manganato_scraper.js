module.exports = manganato_scraper;

const axios = require('axios');
const cheerio = require('cheerio');
const mongodb = require("mongodb");
const { session } = require('../../config/default_session');

const url_domain = 'https://manganato.com/genre-all/';

async function scrap_page(page, collection) {
    const tmp = cheerio.load(await session.get(url_domain + page).then(response => response.data));
            
    await collection.insertMany(tmp('.panel-content-genres .content-genres-item').map((page, el) => {
        const title = tmp(el).children().find('a').attr('title');
        const href = tmp(el).children().find('a').attr('href');
        const img = tmp(el).children().find('a img').attr('src');
        
        return {
            'title': title,
            'href': href,
            'img': img,
        }
    }).get());
}

async function manganato_scraper(collection) {
    try {
        let i = 1;
        const max_page_count = parseInt(
            cheerio.load(await session.get(url_domain + i)
            .then(response => response.data))('.group-page a')
            .eq(-1).attr('href').split('/').pop()
        );
        
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
        console.error(error);
    }
}