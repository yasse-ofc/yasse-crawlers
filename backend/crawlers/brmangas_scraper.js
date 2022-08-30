// DOES NOT REQUIRE PUPPETEER

module.exports = brmangas_scraper;

const axios = require('axios');
const cheerio = require('cheerio');

const url_domain = 'https://www.brmangas.net/lista-de-manga/page/';

const session = axios.create({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
});

async function brmangas_scraper() {
    try {
        let manga = [];
        const tmp = cheerio.load(await session.get(url_domain + '1/').then(response => response.data));
        const max_page_count = parseInt(tmp('.page-numbers').eq(-2).text());
        
        console.log('[BRMANGAS] Getting Manga...');
        
        for (let i = 1; i < max_page_count; i++) {
            let tmp2 = cheerio.load(await session.get(url_domain + i).then(response => response.data));
            
            manga = await manga.concat(tmp2('.item').map((i, el) => {
                const title = tmp2(el).children().attr('title');
                const href = tmp2(el).children().attr('href');
                const img = tmp2(el).children().find('.img-responsive').attr('original-src');
                
                return {
                    'title': title,
                    'href': href,
                    'img': img,
                }
            }).get());

        }
        
        console.log('[BRMANGAS] Getting Manga DONE.');
        return manga;
    
    } catch (error) {
        console.error(error);
        throw error;
    }
}