import { Dataset, createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

router.addDefaultHandler( async ( { enqueueLinks } ) => {
    await enqueueLinks({
        selector: 'li.card > a',
        label: 'manga_page'
    });
    
    await enqueueLinks({
        globs: [
            'https://www.anime-planet.com/anime/watch-online/alpha?page=*',
        ],
    });
});

router.addHandler( 'manga_page', async ( { $, request } ) => {
    const title = $( '#siteContainer > h1' ).text().toLowerCase();
    const href = request.url;
    const img = $( '.screenshots' ).eq( 1 ).attr( 'src' );
    const latestChapter = $( '.card.landscape > a' ).eq( -1 ).text().split( ' ' ).pop();
    const source = 'animeplanet';

    await Dataset.pushData({
        title,
        href,
        img,
        latestChapter,
        source,
    });
});