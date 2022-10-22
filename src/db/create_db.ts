import { runCrawler as goyabu } from '../crawlers/http_crawlers/goyabu_crawler/main.js';
import { runCrawler as brmangas } from '../crawlers/cheerio_crawlers/brmangas_crawler/main.js';
import { runCrawler as lezhinus } from '../crawlers/puppeteer_crawlers/lezhinus_crawler/main.js';
import { runCrawler as readlightnovel } from '../crawlers/cheerio_crawlers/readlightnovel_crawler/main.js';
import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const url = process.env.MONGODB_LINK;

export const client = await MongoClient.connect(url);

console.log('Fetching all series from all crawlers...');

await Promise.all([
    //goyabu(),
    //brmangas(),
    //lezhinus(),
    readlightnovel(),
]);

console.log('Fetched all.');

await client.close();
