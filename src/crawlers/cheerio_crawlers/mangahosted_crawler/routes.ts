import { createCheerioRouter } from 'crawlee';
import { insertOneToDB } from '../../../db/insert_to_db';

export const router = createCheerioRouter();

router.addDefaultHandler( async ( { enqueueLinks } ) => {
    await enqueueLinks({
        globs: [
            'https://mangahosted.com/manga/*'
        ],
        label: 'series_page'
    });

    await enqueueLinks({
        globs: [
            'https://mangahosted.com/mangas/page/*'
        ],
    });
});

router.addHandler( 'series_page', async ( { $, request } ) => {
    const title = $( 'h1.title' ).text().toLowerCase();
    const href = request.url;
    const img = $( '.image-3' ).attr( 'src' );
    const latestChapter = $( '.chapters > div > a' ).eq( 0 ).text();
    const source = 'mangahosted';

    await insertOneToDB( 'manga', {
        title,
        href,
        img,
        latestChapter,
        source,
    });
});