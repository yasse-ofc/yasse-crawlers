import { Dataset, createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ enqueueLinks }) => {
    await enqueueLinks({
        globs: ['https://9anime.vc/az-list/?page=*'],
        label: 'manga_list_page'
    });
});

router.addHandler('manga_list_page', async ({ $, request, enqueueLinks, log }) => {
    log.info(`[9ANIME] Page ${request.url.split('=')[1]} fetched.`);
    
    const current_page = parseInt(request.url.split('=')[1]);
    const last_page = parseInt($('.btn.btn-sm.btn-blank').eq(1).text().slice(3));

    if ( current_page <= last_page ) {
        await enqueueLinks({
            globs: ['https://9anime.vc/az-list/?page=*'],
            label: 'manga_list_page'
        });
    }

    $('.anime-block-ul > .ulclear').first().children().map(async (_i, el) => {
        const title = $(el).find('.dynamic-name').text().toLowerCase();
        const href = 'https://9anime.vc' + $(el).find('.dynamic-name').attr('href');
        const img = $(el).find('.film-poster-img').attr('data-src');
        const latest_chapter = $(el).find('.fdi-duration').text().split('/')[0].slice(41);
        
        await Dataset.pushData({
            title,
            href,
            img,
            latest_chapter,
        });
    });
});

