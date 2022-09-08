module.exports = mangatoon_scraper;

const axios = require('axios');
const cheerio = require('cheerio');
const mongodb = require("mongodb");

const url_domain = 'https://mangatoon.mobi/pt/genre/comic?page=';

const session = axios.create({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
});

async function mangatoon_scraper(collection) {
    try {
        let i = 103;
        let manga = [];

        console.log('[+][MANGATOON] Getting Series...');

        let tmp = cheerio.load(await session.get(url_domain + i).then(response => response.data));
        console.log(tmp.html());

        while (tmp('.items a').html() !== null) {
            //collection.insertMany(tmp('.items a').map((i, el) => {
            manga = manga.concat(tmp('.items a').map((i, el) => {
                const title = tmp(el).children().find('.content-title').text();
                const href = 'https://mangatoon.mobi' + tmp(el).attr('href');
                const img = tmp(el).children().find('img').attr('src');
                
                return {
                    'title': title,
                    'href': href,
                    'img': img,
                }
            }).get());

            tmp = cheerio.load(await session.get(url_domain + i).then(response => response.data));
            
            let page_sing_or_plural = (i == 1) ? 'page' : 'pages';
            console.log(`[+][MANGATOON] ${i} ${page_sing_or_plural} processed.`);
            
            i++;
        }

        console.log('[+][MANGATOON] Got All Series.');
        
    } catch (error) {
        console.log('[-][MANGATOON] Error.');
        console.error(error);
    }
}

mangatoon_scraper();