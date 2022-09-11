module.exports = manganato_scraper;

const axios = require('axios');
const cheerio = require('cheerio');
const mongodb = require("mongodb");
const UserAgent = require('user-agents');
const axiosRetry = require('axios-retry');
const { manganato_session } = require('../../config/default_session');

const userAgent = new UserAgent();
const url_domain = 'https://manganato.com/genre-all/';

async function scrap_page(page, collection) {
    const session = manganato_session();
    axiosRetry(session, {
        retries: 3,
        retryDelay: (retryCount) => {
            console.log(`[-][MANGANATO] Error fetching page ${page}, retrying ${retryCount}/3 times.`);
            return retryCount * 2000;
        }
    });

    const load_page = await session.get(url_domain + page)
        .then(response => response.data)
        .catch((error) => console.log(`[-][MANGANATO] Error ${error.response.status} on page ${page}`));

    const tmp = cheerio.load(load_page);
    
    await collection.insertMany(tmp('.panel-content-genres .content-genres-item').map((page, el) => {
        const title = tmp(el).children().find('a').attr('title').toLowerCase();
        const href = tmp(el).children().find('a').attr('href');
        const img = tmp(el).children().find('a img').attr('src');
        const last_chapter = (tmp(el).find('.genres-item-chap').attr('href') == undefined) ? "" : tmp(el).find('.genres-item-chap').attr('href').split('/').pop().split('-').pop();
        
        return {
            'title': title,
            'href': href,
            'img': img,
            'last_chapter': last_chapter,
        }
    }).get());
}

async function manganato_scraper(collection) {
    try {
        let i = 1;

        const session = manganato_session();
        axiosRetry(session, {
            retries: 3,
            retryDelay: (retryCount) => {
                console.log(`[-][MANGANATO] Error fetching page ${i}, retrying ${retryCount}/3 times.`);
                return retryCount * 2000;
            }
        });

        const load_page = await session.get(url_domain + i)
            .then(response => response.data)
            .catch((error) => console.log(`[-][MANGANATO] Error ${error.response.status} on page ${page}`));

        const max_page_count = parseInt(cheerio.load(load_page)('.group-page a')
            .eq(-1).attr('href').split('/').pop());
        
        console.log('[+][MANGANATO] Getting Series...');
        
        while (i < max_page_count) {
            let promises = [];
            for (let j = i; j < i + 10 && j <= max_page_count; j++) promises.push(j);

            await Promise.all(promises.map(promise => scrap_page(promise, collection)));

            let page = (i + 9 > max_page_count) ? max_page_count : i + 9;
            console.log(`[+][MANGANATO] ${page}/${max_page_count} pages processed.`);

            i += 10;
        }

        console.log('[+][MANGANATO] Got All Series.');
        
    } catch (error) {
        console.log('[-][MANGANATO] Error.');
        throw error;
    }
}