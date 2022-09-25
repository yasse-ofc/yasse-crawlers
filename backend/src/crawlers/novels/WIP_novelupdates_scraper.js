// REQUIRES PUPPETEER

module.exports = novelupdates_scraper;

const axios = require('axios');
const cheerio = require('cheerio');

const url_domain = 'https://www.novelupdates.com/novelslisting/?st=1&pg=';

async function novelupdates_scraper() {
    try {
        let manga = [];
        const tmp = cheerio.load(await session.get(url_domain + '1/').then(response => response.data));
        const max_page_count = parseInt(tmp('.digg_pagination a').eq(-2).text());
        
        console.log('[NOVELUPDATES] Getting Novels...');
        console.log(max_page_count);

        /*for (let i = 1; i < max_page_count; i++) {
            let tmp2 = cheerio.load(await session.get(url_domain + i).then(response => response.data));
            
            manga = await manga.concat(tmp2('.w-col-3').map((i, el) => {
                const title = tmp2(el).children().find('.manga-block-title-link').attr('title');
                const href = tmp2(el).children().find('.manga-block-title-link').attr('href');
                const img = tmp2(el).children().find('.manga-block-img-img').attr('src');
                
                return {
                    'title': title,
                    'href': href,
                    'img': img,
                }
            }).get());
        }
    
        console.log('[NOVELUPDATES] Getting Novels DONE.');
        return manga;*/
    
    } catch (error) {
        console.error(error);
        throw error;
    }
}