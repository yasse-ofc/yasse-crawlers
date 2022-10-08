import { Dataset, createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

router.addDefaultHandler( async ( { enqueueLinks } ) => {
    await enqueueLinks({
        globs: [
            'https://www.brmangas.net/manga/**'
        ],
        label: 'series_page'
    });

    await enqueueLinks({
        globs: [
            'https://www.brmangas.net/lista-de-manga/page/**'
        ],
    });
});

router.addHandler( 'series_page', async ( { $, request } ) => {
    const title = $( '.titulo' )
        .eq( 0 )
        .text()
        .slice( 4, -7 )
        .toLowerCase();
    const href = request.url;
    const img = $( '.img-responsive' )
        .eq( 1 )
        .attr( 'src' );
    const latestChapter = $( '.lista_ep a' )
        .eq( -1 )
        .text()
        .slice( 9 );
    const source = 'brmangas';

    await Dataset.pushData({
        title,
        href,
        img,
        latestChapter,
        source,
    });
});