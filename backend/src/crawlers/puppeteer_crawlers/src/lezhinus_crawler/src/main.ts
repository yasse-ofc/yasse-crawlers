import { PuppeteerCrawler, ProxyConfiguration, log } from 'crawlee';
import { router } from './routes.js';
import * as dotenv from 'dotenv';

dotenv.config();

const startUrls = [
    'https://www.lezhinus.com/en/general?page=0&sub_tags=all',
    'https://www.lezhinus.com/en/general?page=1&sub_tags=all',
    'https://www.lezhinus.com/en/general?page=2&sub_tags=all',
    'https://www.lezhinus.com/en/general?page=3&sub_tags=all',
    'https://www.lezhinus.com/en/general?page=4&sub_tags=all',
    'https://www.lezhinus.com/en/general?page=5&sub_tags=all',
];

export const crawler = new PuppeteerCrawler({
    proxyConfiguration: new ProxyConfiguration({
        proxyUrls: [ `http://${ process.env.PROXY_USERNAME }:${ process.env.PROXY_PASS }@p.webshare.io:80` ]
    }),
    requestHandler: router,
});

log.info( '[LEZHINUS] Fetching...' );

await crawler.run( startUrls );

log.info( '[LEZHINUS] Fetched all pages.' );