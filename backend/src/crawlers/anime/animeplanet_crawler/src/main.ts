import { CheerioCrawler, Dataset, KeyValueStore, ProxyConfiguration, log } from 'crawlee';
import { router } from './routes.js';
import * as dotenv from 'dotenv';

dotenv.config();

const startUrls = [ 'https://www.anime-planet.com/anime/watch-online/alpha?page=1' ];

export const crawler = new CheerioCrawler({
    proxyConfiguration: new ProxyConfiguration({
        proxyUrls: [ `http://${ process.env.PROXY_USERNAME }:${ process.env.PROXY_PASS }@p.webshare.io:80` ]
    }),
    requestHandler: router,
});

log.info( `[ANIMEPLANET] Fetching...` );

await crawler.run( startUrls );

const dataset = await Dataset.open();

await KeyValueStore.setValue( 'animeplanetOutput', ( await dataset.getData() ).items );

log.info( '[ANIMEPLANET] Fetched all pages.' );
log.info( `[ANIMEPLANET] Total series scraped: ${ ( await dataset.getData() ).total }.` );