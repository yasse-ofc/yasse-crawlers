module.exports = novelupdates_scraper;

const axios = require('axios');
const cheerio = require('cheerio');
const { novelupdates_session } = require('../config/default_session');

const url_domain = 'https://www.novelupdates.com/novelslisting/?st=1&pg=';

async function scrap_manga_page(href) {
    const session = novelupdates_session();
    let latest_chapter = null;
    
    await session.get(href)
    .then((response) => {
        latest_chapter = cheerio.load(response.data)('.lista_ep a').eq(-1).text().slice(9);
    })
    .catch(async (error) => {
        if (error.response.status) console.log(`[-][NOVELUPDATES] Error ${error.response.status} on manga page ${href}.`);
        else console.log(`[-][NOVELUPDATES] Error on manga page ${href}.`);
        
        latest_chapter = await scrap_manga_page(href);
    });

    return latest_chapter;
}

async function scrap_page(page, collection) {
    const session = novelupdates_session();
    
    await session.get(url_domain + page)
    .then(async (response) => {
        const tmp = cheerio.load(response.data);
        
        await collection.insertMany(tmp('.search_main_box_nu').map((i, el) => {
            const title = tmp(el).children().find('.search_title > a').text().toLowerCase();
            const href = tmp(el).children().find('.search_title > a').attr('href');
            const img = tmp(el).children().find('img').attr('src');
            //const latest_chapter = scrap_manga_page(href);

            return {
                'title': title,
                'href': href,
                'img': img,
                //'latest_chapter': latest_chapter,
                'source': 'novelupdates'
            }
        }).get());
    })
    .catch(async (error) => {
        if (error.response.status) console.log(`[-][NOVELUPDATES] Error ${error.response.status} on page ${page}.`);
        else console.log(`[-][NOVELUPDATES] Error on page ${page}.`);
        
        await scrap_page(page, collection);
    });
}

async function novelupdates_scraper(collection) {
    try {
        let i = 1;
        
        const session = novelupdates_session();
        
        await session.get(url_domain + i)
        .then(async (response) => {
            const max_page_count = parseInt(cheerio.load(response.data)('.digg_pagination > a').eq(-2).text());
            
            console.log(max_page_count);
            console.log('[+][NOVELUPDATES] Getting Series...');
            
            while (i < max_page_count) {
                let promises = [];
                for (let j = i; j < i + 10 && j <= max_page_count; j++) promises.push(j);
                
                await Promise.all(promises.map(promise => scrap_page(promise, collection)));

                let page = (i + 9 > max_page_count) ? max_page_count : i + 9;
                console.log(`[+][NOVELUPDATES] ${page}/${max_page_count} pages processed.`);
                
                i += 10;
            }
            
            console.log('[+][NOVELUPDATES] Got All Series.');
        })
        .catch(async (error) => {
            if (error.response.status) console.log(`[-][NOVELUPDATES] Error ${error.response.status}.`);
            console.log(`[-][NOVELUPDATES] Error fetching max page count.`);
            
            await novelupdates_scraper(collection);
        });
    }
    catch (error) {
        console.log('[-][NOVELUPDATES] Error.');
        throw error;
    }
}

novelupdates_scraper();