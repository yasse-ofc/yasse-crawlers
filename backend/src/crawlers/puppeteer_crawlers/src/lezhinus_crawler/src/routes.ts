import { createPuppeteerRouter } from 'crawlee';
import { insertOneToDB } from '../../../../../db/src/insert_to_db.js';

export const router = createPuppeteerRouter();

router.addDefaultHandler( async ( { enqueueLinks } ) => {
    await enqueueLinks({
        globs: [
            'https://www.lezhinus.com/en/comic/*',
        ],
        label: 'series_page',
    });
});

router.addHandler( 'series_page', async ( { page, request } ) => {
    const title = ( await page.$eval( '.comicInfo__title', el => el.textContent ) ?? '').toLowerCase();
    const href = request.url;
    const img = await page.$eval( '.comicInfo__cover > img', el => el.getAttribute( 'src' ) );
    const pageToCheck = await page.$$eval( '.episode__name', eps => eps.map( e => e.textContent ) );
    const latestChapter = ( pageToCheck[ pageToCheck.length - 1 ] == 'Epilogue' ) ?
        ( parseInt( pageToCheck[ pageToCheck.length - 2 ] ?? '' ) + 1 ).toString() :
        pageToCheck[ pageToCheck.length - 1 ];
    const source = 'lezhinus';

    await insertOneToDB( 'webtoon', {
        title,
        href,
        img,
        latestChapter,
        source,
    });
});