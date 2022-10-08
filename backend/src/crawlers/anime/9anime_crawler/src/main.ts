import { CheerioCrawler, Dataset, KeyValueStore, ProxyConfiguration, log } from 'crawlee';
import { router } from './routes.js';
import * as dotenv from 'dotenv';

dotenv.config();

const startUrls = [ 'https://9anime.vc/az-list/?page=0' ];

export const crawler = new CheerioCrawler({
    proxyConfiguration: new ProxyConfiguration({
        proxyUrls: [ `http://${ process.env.PROXY_USERNAME }:${ process.env.PROXY_PASS }@p.webshare.io:80` ]
    }),
    requestHandler: router,
});

log.info( '[9ANIME] Fetching...' );

await crawler.run( startUrls );

const dataset = await Dataset.open();

await KeyValueStore.setValue( '9animeOutput', ( await dataset.getData() ).items );

log.info( '[9ANIME] Fetched all pages.' );
log.info( `[9ANIME] Total series scraped: ${ ( await dataset.getData() ).total }.` );