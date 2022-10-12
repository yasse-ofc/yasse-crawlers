import { createCheerioRouter } from 'crawlee';
import { insertOneToDB } from '../../../db/insert_to_db';

export const router = createCheerioRouter();

router.addDefaultHandler( async ( { enqueueLinks } ) => {
    await enqueueLinks({
        selector: '.esquerda > ul > li > div > a',
        label: 'series_page'
    });

    await enqueueLinks({
        globs: [
            'https://xpanimes.com/category/animes/page/*/'
        ],
    });
});

router.addHandler( 'series_page', async ( { $, request } ) => {
    const title = $( '.big.title-single' ).text().slice( 0, -7 ).toLowerCase();
    const href = request.url;
    const img = $( '.capa-single > img' ).attr( 'src' );
    const latestChapter = $( '.check_lista.lista_personalizada > ul > li' ).text();
    const source = 'xpanimes';

    console.log(latestChapter);

    await insertOneToDB( 'anime', {
        title,
        href,
        img,
        latestChapter,
        source,
    });
});