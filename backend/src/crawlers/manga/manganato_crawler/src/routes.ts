import { Dataset, createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

router.addDefaultHandler( async ( { $, enqueueLinks } ) => {
    $( '.panel-content-genres .content-genres-item' )
        .map( async ( _i, series ) => {
            const title = (
                    $( series )
                    .children()
                    .find( 'a' )
                    .attr( 'title' ) ?? ''
                )
                .toLowerCase();
            const href = $( series )
                .children()
                .find( 'a' )
                .attr( 'href' );
            const img = $( series )
                .children()
                .find( 'a img' )
                .attr( 'src' );
            const latestChapter = (
                    (
                        $( series )
                        .find( '.genres-item-chap' )
                        .attr( 'href' ) ?? ''
                    )
                    .split( '/' )
                    .pop() ?? ''
                )
                .split( '-' )
                .pop();
            const source = 'manganato';
            
            await Dataset.pushData({
                title,
                href,
                img,
                latestChapter,
                source,
            });
        });

    await enqueueLinks({
        globs: [
            'https://manganato.com/genre-all/*?type=newest'
        ],
    });
});