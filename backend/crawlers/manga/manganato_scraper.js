module.exports = manganato_scraper;

const axios = require('axios');
const cheerio = require('cheerio');
const mongodb = require("mongodb");
const { manganato_session } = require('../../config/default_session');

const url_domain = 'https://manganato.com/genre-all/';


async function scrap_page(page, collection) {
    const session = manganato_session();
    
    await session.get(url_domain + page)
    .then(async (response) => {
        const load_page = cheerio.load(response.data);
        
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
    })
    .catch(async (error) => {
        if (error.response.status) console.log(`[-][MANGANATO] Error ${error.response.status} on page ${page}.`);
        else console.log(`[-][MANGANATO] Error on page ${page}.`);
        
        await scrap_page(page, collection);
    });
}

async function manganato_scraper(collection) {
    try {
        let i = 1;
        
        const session = manganato_session();
        
        await session.get(url_domain + i)
        .then(async (response) => {
            const max_page_count = parseInt(cheerio.load(response.data)('.group-page a')
            .eq(-1).attr('href').split('/').pop());
        
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
        })
        .catch(async (error) => {
            console.log(`[-][MANGANATO] Error fetching max page count.`);
            
            await manganato_scraper(collection);
        });
    }
    catch (error) {
        console.log('[-][MANGANATO] Error.');
        throw error;
    }
}
