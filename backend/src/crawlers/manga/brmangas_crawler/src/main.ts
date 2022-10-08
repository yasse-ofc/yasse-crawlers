import { CheerioCrawler, Dataset, KeyValueStore, ProxyConfiguration, log } from 'crawlee';
import { router } from './routes.js';
import * as dotenv from 'dotenv';

dotenv.config();

const startUrls = [ 'https://www.brmangas.net/lista-de-manga' ];

export const crawler = new CheerioCrawler({
    proxyConfiguration: new ProxyConfiguration({
        proxyUrls: [ `http://${ process.env.PROXY_USERNAME }:${ process.env.PROXY_PASS }@p.webshare.io:80` ]
    }),
    requestHandler: router,
});

log.info( '[BRMANGAS] Fetching...' );

await crawler.run( startUrls );

const dataset = await Dataset.open();

await KeyValueStore.setValue( 'brmangasOutput', ( await dataset.getData() ).items );

log.info( '[BRMANGAS] Fetched all pages.' );
log.info( `[BRMANGAS] Total series scraped: ${ ( await dataset.getData() ).total }.` );