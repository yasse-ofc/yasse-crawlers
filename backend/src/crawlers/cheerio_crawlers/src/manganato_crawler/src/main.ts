import { CheerioCrawler, ProxyConfiguration, log } from 'crawlee';
import { router } from './routes.js';
import * as dotenv from 'dotenv';

dotenv.config();

const startUrls = [ 'https://manganato.com/genre-all?type=newest' ];

export const crawler = new CheerioCrawler({
    proxyConfiguration: new ProxyConfiguration({
        proxyUrls: [ `http://${ process.env.PROXY_USERNAME }:${ process.env.PROXY_PASS }@p.webshare.io:80` ]
    }),
    requestHandler: router,
});

log.info( '[MANGANATO] Fetching...' );

await crawler.run( startUrls );

log.info( '[MANGANATO] Fetched all pages.' );