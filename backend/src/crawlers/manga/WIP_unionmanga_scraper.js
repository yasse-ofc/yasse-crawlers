// DOES NOT REQUIRE PUPPETEER

module.exports = unionmanga_scraper;

const axios = require('axios');
const cheerio = require('cheerio');

const url_domain = 'https://unionleitor.top';

const session = axios.create({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
});

async function unionmanga_scraper() {
    try {
        let i = 1;
        let manga = [];

        console.log('[MANGALIVRE] Getting Manga...');
        
        let tmp = cheerio.load(await session.get(url_domain + i).then(response => response.data));

        /*while (tmp('.items a').html() != null) {
            manga = await manga.concat(tmp('.items a').map((i, el) => {
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
            i++;
        }

        console.log('[MANGALIVRE] Getting Manga DONE.');
        return manga;*/
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}