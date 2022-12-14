import { createCheerioRouter } from 'crawlee';
import { insertOneToDB } from '../../../db/insert_to_db';

export const router = createCheerioRouter();

router.addDefaultHandler( async ( { $, enqueueLinks } ) => {
    $( '.panel-content-genres .content-genres-item' ).map( async ( _i, series ) => {
        const title = ( $( series ).children().find( 'a' ).attr( 'title' ) ?? '' ).toLowerCase();
        const href = $( series ).children().find( 'a' ).attr( 'href' );
        const img = $( series ).children().find( 'a img' ).attr( 'src' );
        const latestChapter = ( ( $( series ).find( '.genres-item-chap' ).attr( 'href' ) ?? '' ).split( '/' ).pop() ?? '' ).split( '-' ).pop();
        const source = 'manganato';
        
        await insertOneToDB( 'manga', {
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