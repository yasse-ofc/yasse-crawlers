module.exports = manganato_scraper;

const axios = require('axios');
const cheerio = require('cheerio');
const mongodb = require("mongodb");
const UserAgent = require('user-agents');
const { session } = require('../../config/default_session');

const userAgent = new UserAgent();
const url_domain = 'https://manganato.com/genre-all/';

async function scrap_page(page, collection) {
    const tmp = cheerio.load(await session.get(url_domain + page, {
        headers: {
            'User-Agent': userAgent.random().toString(),
            'Host': 'manganato.com',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': 'https://manganato.com/',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': 1,
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-User': '?1',
        }})
        .then(response => response.data)
        .catch((error) => {
            if (error.response) {
                console.log(`[-][MANGANATO] Response Error on page ${page}.`);
                scrap_page(page, collection);
                return;
            }
        })
    );
            
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
        const max_page_count = parseInt(
            cheerio.load(await session.get(url_domain + i, {
                headers: {
                    'User-Agent': userAgent.random().toString(),
                    'Host': 'manganato.com',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Referer': 'https://manganato.com/',
                    'Connection': 'keep-alive',
                    'Upgrade-Insecure-Requests': 1,
                    'Sec-Fetch-Dest': 'document',
                    'Sec-Fetch-Mode': 'navigate',
                    'Sec-Fetch-Site': 'same-origin',
                    'Sec-Fetch-User': '?1',
                }})
            .then(response => response.data)
            .catch((error) => {
                if (error.response) {
                    console.log(`[-][MANGANATO] Response Error on page ${page}.`);
                    manganato_scraper(collection);
                    return;
                }
            }))('.group-page a')
            .eq(-1).attr('href').split('/').pop()
        );
        
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