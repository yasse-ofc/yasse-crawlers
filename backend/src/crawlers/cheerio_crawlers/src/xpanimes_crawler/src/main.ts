import { CheerioCrawler, ProxyConfiguration, log } from 'crawlee';
import { router } from './routes.js';
import * as dotenv from 'dotenv';

dotenv.config();

const startUrls = [ 'https://xpanimes.com/category/animes/page/1/' ];

export const crawler = new CheerioCrawler({
    proxyConfiguration: new ProxyConfiguration({
        proxyUrls: [ `http://${ process.env.PROXY_USERNAME }:${ process.env.PROXY_PASS }@p.webshare.io:80` ]
    }),
    requestHandler: router,
});

log.info( '[XPANIMES] Fetching...' );

await crawler.run( startUrls );

log.info( '[XPANIMES] Fetched all pages.' );