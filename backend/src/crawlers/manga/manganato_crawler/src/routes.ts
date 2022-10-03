import { Dataset, createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ $, enqueueLinks }) => {
    $('.panel-content-genres .content-genres-item').map(async (_i, el) => {
        const title = ($(el).children().find('a').attr('title') ?? '').toLowerCase();
        const href = $(el).children().find('a').attr('href');
        const img = $(el).children().find('a img').attr('src');
        const latest_chapter = (($(el).find('.genres-item-chap').attr('href') ?? '').split('/').pop() ?? '').split('-').pop();
        const source = 'manganato';
        
        await Dataset.pushData({
            title,
            href,
            img,
            latest_chapter,
            source,
        });
    });

    await enqueueLinks({
        globs: ['https://manganato.com/genre-all/*?type=newest']
    });
});