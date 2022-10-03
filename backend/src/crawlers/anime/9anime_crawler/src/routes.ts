import { Dataset, createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ $, request, enqueueLinks }) => {
    const current_page = parseInt(request.url.split('=')[1]);
    const last_page = parseInt($('.btn.btn-sm.btn-blank').eq(1).text().slice(3));

    if ( current_page <= last_page ) {
        await enqueueLinks({
            globs: ['https://9anime.vc/az-list/?page=*'],
        });
    }

    $('.anime-block-ul > .ulclear').first().children().map(async (_i, el) => {
        const title = $(el).find('.dynamic-name').text().toLowerCase();
        const href = 'https://9anime.vc' + $(el).find('.dynamic-name').attr('href');
        const img = $(el).find('.film-poster-img').attr('data-src');
        const latest_chapter = $(el).find('.fdi-duration').text().split('/')[0].slice(41);
        const source = '9animes';
        
        await Dataset.pushData({
            title,
            href,
            img,
            latest_chapter,
            source,
        });
    });
});

