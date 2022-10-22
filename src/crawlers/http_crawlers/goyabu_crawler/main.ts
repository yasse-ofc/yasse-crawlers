import { HttpCrawler, ProxyConfiguration, log } from 'crawlee';
import { OptionalId } from 'mongodb';
import * as dotenv from 'dotenv';
import { insertManyToDB } from '../../../db/insert_to_db.js';

dotenv.config();

const startUrls = [ 'https://goyabu.com/api/show2.php' ];

export async function runCrawler() {
    const crawler = new HttpCrawler({
        proxyConfiguration: new ProxyConfiguration({
            proxyUrls: [ `http://${ process.env.PROXY_USERNAME }:${ process.env.PROXY_PASS }@p.webshare.io:80` ]
        }),
        async requestHandler( { body } ) {
            const collectedData = await JSON.parse( body.toString() );

            const processedData: OptionalId<Document>[] = Array.from( collectedData.map( ( el: { title: string; slug: string; cover: string; videos: number; } ) => {
                const title = el.title.toLowerCase();
                const href = 'https://goyabu.com/assistir/' + el.slug + '/';
                const img = 'https://goyabu.com/' + el.cover;
                const latestChapter = el.videos;
                const source = 'goyabu';

                return {
                    title,
                    href,
                    img,
                    latestChapter,
                    source,
                }
            }));

            // Removing last element because it holds "null" strings
            await insertManyToDB( 'anime', processedData.slice( 0, -1 ) );
        }
    });

    log.info( '[GOYABU] Fetching...' );

    await crawler.run( startUrls );

    log.info( '[GOYABU] Fetched all pages.' );
}
