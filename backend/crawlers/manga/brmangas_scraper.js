module.exports = brmangas_scraper;

const axios = require('axios');
const cheerio = require('cheerio');
const { session } = require('../../config/default_session');

const url_domain = 'https://www.brmangas.net/lista-de-manga/page/';

async function scrap_page(page, collection) {
    const tmp = cheerio.load(await session.get(url_domain + page).then(response => response.data));
            
    await collection.insertMany(tmp('.item').map((i, el) => {
        const title = tmp(el).children().attr('title').slice(0, -7);
        const href = tmp(el).children().attr('href');
        const img = tmp(el).children().find('.img-responsive').attr('original-src');
        
        return {
            'title': title,
            'href': href,
            'img': img,
        }
    }).get());
}

async function brmangas_scraper(collection) {
    try {
        let i = 1;
        const max_page_count = parseInt(
            cheerio.load(await session.get(url_domain + i)
            .then(response => response.data))('.page-numbers')
            .eq(-2).text()
        );
        
        console.log('[+][BRMANGAS] Getting Series...');
        
        while (i < max_page_count) {
            let promises = [];
            for (let j = i; j < i + 10 && j <= max_page_count; j++) promises.push(j);

            await Promise.all(promises.map(promise => scrap_page(promise, collection)));

            let page = (i + 9 > max_page_count) ? max_page_count : i + 9;
            console.log(`[+][BRMANGAS] ${page}/${max_page_count} pages processed.`);

            i += 10;
        }

        console.log('[+][BRMANGAS] Got All Series.');
    }
    catch (error) {
        console.log('[-][BRMANGAS] Error.');
        console.error(error);
    }
}