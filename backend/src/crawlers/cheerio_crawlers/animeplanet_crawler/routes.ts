import { createCheerioRouter } from 'crawlee';
import { insertOneToDB } from '../../../db/insert_to_db';

export const router = createCheerioRouter();

router.addDefaultHandler( async ( { enqueueLinks } ) => {
    await enqueueLinks({
        selector: 'li.card > a',
        label: 'series_page'
    });
    
    await enqueueLinks({
        globs: [
            'https://www.anime-planet.com/anime/watch-online/alpha?page=*',
        ],
    });
});

router.addHandler( 'series_page', async ( { $, request } ) => {
    const title = $( '#siteContainer > h1' ).text().toLowerCase();
    const href = request.url;
    const img = $( '.screenshots' ).eq( 1 ).attr( 'src' );
    const latestChapter = $( '.card.landscape > a' ).eq( -1 ).text().split( ' ' ).pop();
    const source = 'animeplanet';

    await insertOneToDB( 'anime', {
        title,
        href,
        img,
        latestChapter,
        source,
    });
});