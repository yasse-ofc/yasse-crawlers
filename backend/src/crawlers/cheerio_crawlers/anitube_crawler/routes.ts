import { createCheerioRouter } from 'crawlee';
import { insertOneToDB } from '../../../db/insert_to_db';

export const router = createCheerioRouter();

router.addDefaultHandler( async ( { enqueueLinks } ) => {
    await enqueueLinks({
        selector: 'div.aniItem > a',
        label: 'series_page'
    });

    await enqueueLinks({
        globs: [
            'https://www.anitube.site/lista-de-animes-online/page/*/'
        ],
    });
});

router.addHandler( 'series_page', async ( { $, request } ) => {
    const title = $( '.mwidth > h1' ).text().slice( 0, -21 ).toLowerCase();
    const href = request.url;
    const img = $( '#capaAnime > img' ).attr( 'src' );
    const latestChapter = $( '.pagAniListaContainer > a' ).eq( -1 ).text().match(/Episódio (\d+)/);
    const source = 'anitube';

    await insertOneToDB( 'test', {
        title,
        href,
        img,
        latestChapter,
        source,
    });
});