module.exports = brmangas_scraper;

const axios = require('axios');
const cheerio = require('cheerio');
const { brmangas_session } = require('../../config/default_session');

const url_domain = 'https://www.brmangas.net/lista-de-manga/page/';


async function scrap_page(page, collection) {
    const session = brmangas_session();
    
    await session.get(url_domain + page)
    .then(async (response) => {
        const tmp = cheerio.load(response.data);
        
        await collection.insertMany(tmp('.item').map(async (i, el) => {
            const title = tmp(el).children().attr('title').slice(0, -7).toLowerCase();
            const href = tmp(el).children().attr('href');
            const img = tmp(el).children().find('.img-responsive').attr('original-src');
            
            return {
                'title': title,
                'href': href,
                'img': img,
                'source': 'brmangas'
            }
        }).get());
    })
    .catch(async (error) => {
        if (error.response.status) console.log(`[-][MANGANATO] Error ${error.response.status} on page ${page}.`);
        else console.log(`[-][BRMANGAS] Error on page ${page}.`);
        
        await scrap_page(page, collection);
    });
}

async function brmangas_scraper(collection) {
    try {
        let i = 1;
        
        const session = brmangas_session();
        
        await session.get(url_domain + i)
        .then(async (response) => {
            const max_page_count = parseInt(cheerio.load(response.data)('.page-numbers').eq(-2).text());
            
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
        })
        .catch(async (error) => {
            console.log(`[-][BRMANGAS] Error fetching max page count.`);
            
            await brmangas_scraper(collection);
        });
    }
    catch (error) {
        console.log('[-][BRMANGAS] Error.');
        throw error;
    }
}
