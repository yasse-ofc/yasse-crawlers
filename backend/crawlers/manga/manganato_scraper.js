module.exports = manganato_scraper;

const axios = require('axios');
const cheerio = require('cheerio');
const mongodb = require("mongodb");

const url_domain = 'https://manganato.com/genre-all/';

const session = axios.create({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
});

async function manganato_scraper(collection) {
    try {
        let manga = [];

        const tmp = cheerio.load(await session.get(url_domain + '1/').then(response => response.data));
        const max_page_count = parseInt(tmp('.group-page a').eq(-1).attr('href').split('/').pop());
        
        console.log('[+][MANGANATO] Getting Series...');
        
        for (let i = 1; i < max_page_count; i++) {
            let tmp2 = cheerio.load(await session.get(url_domain + i).then(response => response.data));
            
            //collection.insertMany(tmp2('.panel-content-genres .content-genres-item').map((i, el) => {
            manga = manga.concat(tmp2('.panel-content-genres .content-genres-item').map((i, el) => {
                const title = tmp2(el).children().find('a').attr('title');
                const href = tmp2(el).children().find('a').attr('href');
                const img = tmp2(el).children().find('a img').attr('src');
                
                return {
                    'title': title,
                    'href': href,
                    'img': img,
                }
            }).get());

            console.log(manga);

            let page_sing_or_plural = (i == 1) ? 'page' : 'pages';
            console.log(`[+][MANGANATO] ${i} ${page_sing_or_plural} processed.`);
        }

        console.log('[+][MANGANATO] Got All Series.');
        
    } catch (error) {
        console.log('[-][MANGANATO] Error.');
        console.error(error);
    }
}

manganato_scraper();