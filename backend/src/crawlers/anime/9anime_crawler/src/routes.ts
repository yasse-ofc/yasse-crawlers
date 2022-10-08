import { Dataset, createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

router.addDefaultHandler( async ( { $, request, enqueueLinks } ) => {
    const currentPage = parseInt( request.url.split( '=' )[ 1 ] );
    const lastPage = parseInt( $( '.btn.btn-sm.btn-blank' ).eq( 1 ).text().slice( 3 ));

    if ( currentPage <= lastPage ) {
        await enqueueLinks({
            globs: [ 'https://9anime.vc/az-list/?page=*' ],
        });
    }

    $( '.anime-block-ul > .ulclear' ).first().children().map( async ( _i, series ) => {
        const title = $( series ).find( '.dynamic-name' ).text().toLowerCase();
        const href = 'https://9anime.vc' + $( series ).find('.dynamic-name').attr('href');
        const img = $( series ).find( '.film-poster-img' ).attr( 'data-src' );
        const latestChapter = $( series ).find( '.fdi-duration' ).text().split( '/' )[ 0 ].slice( 41 );
        const source = '9animes';
        
        await Dataset.pushData({
            title,
            href,
            img,
            latestChapter,
            source,
        });
    });
});