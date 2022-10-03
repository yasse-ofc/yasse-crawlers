// For more information, see https://crawlee.dev/
import { CheerioCrawler, Dataset, KeyValueStore, ProxyConfiguration, log } from 'crawlee';
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

const crawler = new CheerioCrawler({
    proxyConfiguration: new ProxyConfiguration({ proxyUrls: [`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASS}@p.webshare.io:80`] }),
    requestHandler: router,
});

log.debug(`[LEZHINUS] Fetching...`);

await crawler.run(startUrls);

const dataset = await Dataset.open();

await KeyValueStore.setValue('brmangas_output', (await dataset.getData()).items);

log.debug(`[LEZHINUS] Fetched all pages.`);
log.debug(`[LEZHINUS] Total series scraped: ${(await dataset.getData()).total}.`)

export { crawler };