import { CheerioCrawler, ProxyConfiguration, log } from 'crawlee';
import { router } from './routes.js';
import * as dotenv from 'dotenv';

dotenv.config();

const startUrls = [ 'https://www.anime-planet.com/anime/watch-online/alpha?page=1' ];

export async function runCrawler() {
    const crawler = new CheerioCrawler({
        proxyConfiguration: new ProxyConfiguration({
            proxyUrls: [ `http://${ process.env.PROXY_USERNAME }:${ process.env.PROXY_PASS }@p.webshare.io:80` ]
        }),
        requestHandler: router,
    });

    log.info( '[ANIMEPLANET] Fetching...' );

    await crawler.run( startUrls );

    log.info( '[ANIMEPLANET] Fetched all pages.' );
}
