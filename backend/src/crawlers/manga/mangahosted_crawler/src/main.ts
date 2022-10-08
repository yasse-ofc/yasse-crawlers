import { CheerioCrawler, Dataset, KeyValueStore, ProxyConfiguration, log } from 'crawlee';
import { router } from './routes.js';
import * as dotenv from 'dotenv';

dotenv.config();

const startUrls = [ 'https://mangahosted.com/mangas/page/1' ];

export const crawler = new CheerioCrawler({
    proxyConfiguration: new ProxyConfiguration({
        proxyUrls: [ `http://${ process.env.PROXY_USERNAME }:${ process.env.PROXY_PASS }@p.webshare.io:80` ]
    }),
    requestHandler: router,
});

log.info( '[MANGAHOSTED] Fetching...' );

await crawler.run( startUrls );

const dataset = await Dataset.open();

await KeyValueStore.setValue( 'mangahostedOutput', ( await dataset.getData() ).items );

log.info( '[MANGAHOSTED] Fetched all pages.' );
log.info( `[MANGAHOSTED] Total series scraped: ${ ( await dataset.getData() ).total }.` );