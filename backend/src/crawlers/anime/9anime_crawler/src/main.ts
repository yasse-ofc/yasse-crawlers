// For more information, see https://crawlee.dev/
import { CheerioCrawler, Dataset, KeyValueStore, ProxyConfiguration, log } from 'crawlee';
import { router } from './routes.js';
import * as dotenv from 'dotenv';

dotenv.config();

const startUrls = ['https://9anime.vc/az-list/?page=0'];

const crawler = new CheerioCrawler({
    proxyConfiguration: new ProxyConfiguration({ proxyUrls: [`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASS}@p.webshare.io:80`] }),
    requestHandler: router,
});

await crawler.run(startUrls);

const dataset = await Dataset.open();

await KeyValueStore.setValue('output', (await dataset.getData()).items);

log.info(`Total series scraped: ${(await dataset.getData()).total}`)

export { crawler };