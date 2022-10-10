import { runCrawler as nineanime } from '../../crawlers/cheerio_crawlers/src/9anime_crawler/src/main.js';
import { runCrawler as goyabu } from '../../crawlers/http_crawlers/src/goyabu_crawler/src/main.js';
import { runCrawler as lezhinus } from '../../crawlers/puppeteer_crawlers/src/lezhinus_crawler/src/main.js';
import * as dotenv from 'dotenv';
import { MongoClient } from "mongodb";

dotenv.config();

const url = process.env.MONGODB_LINK;

export const client = await MongoClient.connect( url );

console.log('Fetching all series from all crawlers...');

await Promise.all([
    nineanime(),
    goyabu(),
    lezhinus(),
]);

console.log('Fetched all.');

await client.close();