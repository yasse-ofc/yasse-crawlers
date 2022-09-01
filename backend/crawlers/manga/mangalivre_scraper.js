// REQUIRES PUPPETEER

module.exports = mangalivre_scraper;

const axios = require('axios');
const cheerio = require('cheerio');
const mongodb = require("mongodb");
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const url_domain = 'https://mangalivre.net/series/index/nome/todos?page=';

const session = axios.create({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
});

async function mangalivre_scraper(collection) {
    try {
        let i = 1;

        console.log('[+][MANGALIVRE] Getting Series...');

        await puppeteer.launch({ headless: true }).then(async browser => {
            const page = await browser.newPage();

            while (true) {
                await page.goto(url_domain + i, { waitUntil: 'domcontentloaded' });
                await page.waitForTimeout(5000);

                let tmp = cheerio.load(await page.content());

                if (tmp('.content-wrapper').find('h1').text() == '404') break;
                
                let class_to_scrape = (tmp('.full-series-list .seriesList > li').html() === null) ? '.seriesList > li' : '.full-series-list .seriesList > li';
                
                collection.insertMany(tmp(class_to_scrape).map((i, el) => {
                    const title = tmp(el).children().find('.series-title h1').text().trim();
                    const href = 'https://mangalivre.net' + tmp(el).children().attr('href');
                    const img = tmp(el).children().find('.cover-image').attr('style').slice(23, -3);
                    
                    return {
                        'title': title,
                        'href': href,
                        'img': img,
                    }
                }).get());
                
                let page_sing_or_plural = (i == 1) ? 'page' : 'pages';
                console.log(`[+][MANGALIVRE] ${i} ${page_sing_or_plural} processed.`)

                i++;
            }

            await browser.close();
        });
                
        console.log('[+][MANGALIVRE] Got All Series.');

    } catch (error) {
        console.log('[-][MANGALIVRE] Error.');
        console.error(error);
    }
}