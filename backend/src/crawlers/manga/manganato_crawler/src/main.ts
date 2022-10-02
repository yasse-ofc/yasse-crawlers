// For more information, see https://crawlee.dev/
import { CheerioCrawler, Dataset, KeyValueStore, ProxyConfiguration, log } from 'crawlee';
import { router } from './routes.js';
import * as dotenv from 'dotenv';

dotenv.config();

const startUrls = ['https://manganato.com/genre-all?type=newest'];

const crawler = new CheerioCrawler({
    proxyConfiguration: new ProxyConfiguration({ proxyUrls: [`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASS}@p.webshare.io:80`] }),
    requestHandler: router,
});

log.debug(`[MANGANATO] Fetching...`);

await crawler.run(startUrls);

const dataset = await Dataset.open();

await KeyValueStore.setValue('manganato_output', (await dataset.getData()).items);

log.debug(`[MANGANATO] Fetched all pages.`);
log.debug(`[MANGANATO] Total series scraped: ${(await dataset.getData()).total}.`)

export { crawler };