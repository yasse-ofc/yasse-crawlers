module.exports = mangahost_scraper;

const axios = require('axios');
const cheerio = require('cheerio');
const mongodb = require("mongodb");
const { session } = require('../../config/default_session');

const url_domain = 'https://mangahosted.com/mangas/page/';

async function scrap_page(page, collection) {
    const tmp = cheerio.load(await session.get(url_domain + i).then(response => response.data));
            
    collection.InsertMany(tmp('.w-col-3').map((i, el) => {
        const title = tmp(el).children().find('.manga-block-title-link').attr('title');
        const href = tmp(el).children().find('.manga-block-title-link').attr('href');
        const img = tmp(el).children().find('.manga-block-img-img').attr('src');
        
        return {
            'title': title,
            'href': href,
            'img': img,
        }
    }).get());
}

async function mangahost_scraper(collection) {
    try {
        let i = 1;
        const max_page_count = parseInt(
            cheerio.load(await session.get(url_domain + '1/')
            .then(response => response.data))('.last')
            .attr('href').split('/').pop()
        );
        
        console.log('[+][MANGAHOST] Getting Series...');
        
        while (i < max_page_count) {
            let promises = [];
            for (let j = i; j < i + 10 && j <= max_page_count; j++) promises.push(j);

            await Promise.all(promises.map(promise => scrap_page(promise, collection)));

            let page = (i + 9 > max_page_count) ? max_page_count : i + 9;
            console.log(`[+][MANGAHOST] ${page}/${max_page_count} pages processed.`);
       
            i += 10;
        }
    
        console.log('[+][MANGAHOST] Got All Series.');
        
    } catch (error) {
        console.log('[-][MANGAHOST] Error.');
        console.error(error);
    }
}