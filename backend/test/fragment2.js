module.exports = mangalivre_scraper;

const cheerio = require('cheerio');
const mongodb = require("mongodb");
const proxyChain = require('proxy-chain');
const dotenv = require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const { proxy_url } = require('../config/default_session');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const url_domain = 'https://mangalivre.net/series/index/nome/todos?page=';
let continue_scraping = true;
let page_count = 1;

async function scrap_page(page_index, collection) {
    const new_proxy_url = await proxyChain.anonymizeProxy({ url: proxy_url });
    
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            `--proxy-server=${new_proxy_url}`,
        ],
    });

    const [page] = await browser.pages();
    page.setCookie('_ga=1a00a7c1-ef46-433d-81b3-7e4624b7716e; \
                    __gads=ID=932862219d11110b-227d8798af7c0007:T=1661949782:RT=1661949782:S=ALNI_MYkduQqluVMhMXjLFT8C3rYaTMsqA; \
                    __gpi=UID=000009172e2b2c2f:T=1661949782:RT=1662042167:S=ALNI_MZytzI0_fCbu-bFWm6tJNlhbah3FQ; \
                    __cf_bm=tgqSq6XRFwGvDhnncnP8Wy09W6Uk9lpgKutsymy36RM-1663524290-0-AfJ09O6OWTnB1Z+cdZbG/3OirRhYCIvyJuT5SgMekQnNFz6vUejZ7Y5kZ0OOEs7wWHGc+9lJVPCLvuBVa82gSonin5gq1KFmhqWZbvfhjeqEhEUFbwE98DDgQUqoR3cf32I/JD4h5o6t5UasgtB/OkNLv/r2OWoTP17F06SSbirm');
    
    await page.goto(url_domain + page_index, { waitUntil: 'domcontentloaded' });
    
    const tmp = cheerio.load(await page.content());
    
    if (tmp('.content-wrapper').find('h1').text() == '404') continue_scraping = false;
    else {
        let class_to_scrape = (tmp('.full-series-list .seriesList > li').html() === null) ? '.seriesList > li' : '.full-series-list .seriesList > li';

        //collection.insertMany(tmp(class_to_scrape).map((i, el) => {
        console.log(tmp(class_to_scrape).map((i, el) => {
            const title = tmp(el).children().find('.series-title h1').text().trim().toLowerCase();
            const href = 'https://mangalivre.net' + tmp(el).children().attr('href');
            const img = tmp(el).children().find('.cover-image').attr('style').slice(23, -3);
            
            return {
                'title': title,
                'href': href,
                'img': img,
                'source': 'mangalivre',
            }
        }).get());

        page_count++;
    }
    
    //await browser.close();
    await proxyChain.closeAnonymizedProxy(new_proxy_url, true);
}

async function mangalivre_scraper(collection) {
    try {
        console.log('[+][MANGALIVRE] Getting Series...');

        while (continue_scraping) {
            let promises = [];
            for (let j = page_count; j < page_count + 1; j++) promises.push(j);

            await Promise.all(promises.map(promise => scrap_page(promise, collection)));

            console.log(`[+][MANGALIVRE] ${page_count - 1} pages processed.`);
            continue_scraping = false;
        }
    } catch (error) {
        console.log('[-][MANGALIVRE] Error.');
        throw error;
    }
}

mangalivre_scraper()