import { runCrawler as nineanime } from '../crawlers/cheerio_crawlers/9anime_crawler/main';
import { runCrawler as goyabu } from '../crawlers/http_crawlers/goyabu_crawler/main';
import { runCrawler as lezhinus } from '../crawlers/puppeteer_crawlers/lezhinus_crawler/main';
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