// REQUIRES PUPPETEER

module.exports = mangavibe_scraper;

const axios = require('axios');
const cheerio = require('cheerio');

const url_domain = 'https://mangavibe.top/mangas/';

const session = axios.create({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
});

async function mangavibe_scraper() {
    try {
        let manga = [];
        //const tmp = cheerio.load(await session.get(url_domain + '1').then(response => response.data));
        //const max_page_count = parseInt(tmp('.page-numbers').eq(-2).text());
        
        console.log('[MANGAVIBE] Getting Manga...');

        //for (let i = 1; i < max_page_count; i++) {
        for (let i = 1; i < 2; i++) {
            let tmp2 = cheerio.load(await session.get(url_domain + i).then(response => response.data));

            console.log(tmp2.html());

            manga = await manga.concat(tmp2('.MuiGrid-root').eq(-1).map((i, el) => {
                const title = tmp2(el).children().find('.MuiCardContent-root').attr('title');
                const href = tmp2(el).children().find('.MuiGrid-item a').attr('href');
                const img = tmp2(el).children().find('.MuiCardMedia-root').attr('style').split('"');

                return {
                    'title': title,
                    'href': href,
                    'img': img,
                }
            }).get());

            console.log(manga);
        }

        console.log('[MANGAVIBE] Getting Manga DONE.');
    } catch (error) {
        console.error(error);
        throw error;
    }
}