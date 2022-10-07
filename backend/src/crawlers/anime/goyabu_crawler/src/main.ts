import { HttpCrawler, Dataset, KeyValueStore, ProxyConfiguration, log } from 'crawlee';
import { MongoClient, OptionalId, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_LINK ?? '');

client.connect();
const collection = client.db('search-engine-db').collection('test');

const startUrls = ['https://goyabu.com/api/show2.php'];

const crawler = new HttpCrawler({
    proxyConfiguration: new ProxyConfiguration({ proxyUrls: [`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASS}@p.webshare.io:80`] }),
    async requestHandler({ body }) {
        const collected_data = await JSON.parse(body.toString());

        const processed_data: OptionalId<Document>[] = Array.from(collected_data.map((el: { title: string; slug: string; cover: string; videos: number; }) => {
            const title = el.title.toLowerCase();
            const href = 'https://goyabu.com/assistir/' + el.slug + '/';
            const img = 'https://goyabu.com/' + el.cover;
            const latest_chapter = el.videos;
            const source = 'goyabu';

            return {
                title,
                href,
                img,
                latest_chapter,
                source,
            }
        }));

        //await Dataset.pushData(processed_data.slice(0, -1)); // Removing last element because it holds "null" strings
        await collection.insertMany(processed_data.slice(0, -1));
    }
});

log.info(`[GOYABU] Fetching...`);

await crawler.run(startUrls);

await client.close();

const dataset = await Dataset.open();

await KeyValueStore.setValue('9anime_output', (await dataset.getData()).items);

log.info(`[GOYABU] Fetched all pages.`);
log.info(`[GOYABU] Total series scraped: ${(await dataset.getData()).total}.`)

export { crawler };