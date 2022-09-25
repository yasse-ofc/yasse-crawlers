module.exports = animeplanet_scraper;

const axios = require('axios');
const cheerio = require('cheerio');
const { animeplanet_session } = require('../../config/default_session');

const url_domain = 'https://9anime.vc/az-list/?page=';

async function scrap_manga_page(href) {
    const session = animeplanet_session();
    let latest_chapter = null;
    
    await session.get(href)
    .then((response) => {
        latest_chapter = cheerio.load(response.data)('.lista_ep a').eq(-1).text().slice(9);
    })
    .catch(async (error) => {
        if (error.response.status) console.log(`[-][ANIMEPLANET] Error ${error.response.status} on manga page ${href}.`);
        else console.log(`[-][ANIMEPLANET] Error on manga page ${href}.`);
        
        latest_chapter = await scrap_manga_page(href);
    });

    return latest_chapter;
}

async function scrap_page(page, collection) {
    const session = animeplanet_session();
    
    await session.get(url_domain + page)
    .then(async (response) => {
        const tmp = cheerio.load(response.data);
        
        await collection.insertMany(tmp('.card').map((i, el) => {
            const title = tmp(el).children().find('.cardName').text().toLowerCase();
            const href = 'https://www.anime-planet.com' + tmp(el).find('a').attr('href');
            const img = tmp(el).find('.crop > img').attr('data-src');
            //const latest_chapter = scrap_manga_page(href);

            return {
                'title': title,
                'href': href,
                'img': img,
                //'latest_chapter': latest_chapter,
                'source': 'animeplanet'
            }
        }).get());
    })
    .catch(async (error) => {
        if (error.response.status) console.log(`[-][ANIMEPLANET] Error ${error.response.status} on page ${page}.`);
        else console.log(`[-][ANIMEPLANET] Error on page ${page}.`);
        
        await scrap_page(page, collection);
    });
}

async function animeplanet_scraper(collection) {
    try {
        let i = 1;
        
        const session = animeplanet_session();
        
        await session.get(url_domain + i)
        .then(async (response) => {
            const max_page_count = parseInt(cheerio.load(response.data)('.nav > li').eq(-2).text());
            
            console.log('[+][ANIMEPLANET] Getting Series...');
            
            while (i < max_page_count) {
                let promises = [];
                for (let j = i; j < i + 10 && j <= max_page_count; j++) promises.push(j);
                
                await Promise.all(promises.map(promise => scrap_page(promise, collection)));

                let page = (i + 9 > max_page_count) ? max_page_count : i + 9;
                console.log(`[+][ANIMEPLANET] ${page}/${max_page_count} pages processed.`);
                
                i += 10;
            }
            
            console.log('[+][ANIMEPLANET] Got All Series.');
        })
        .catch(async (error) => {
            console.log(`[-][ANIMEPLANET] Error fetching max page count.`);
            
            await animeplanet_scraper(collection);
        });
    }
    catch (error) {
        console.log('[-][ANIMEPLANET] Error.');
        throw error;
    }
}