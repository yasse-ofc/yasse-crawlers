import { createCheerioRouter } from 'crawlee';
import { insertOneToDB } from '../../../db/insert_to_db.js';

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ enqueueLinks }) => {
    await enqueueLinks({
        selector: '.list-by-word-body > ul > li > a',
        label: 'series_page',
    });

    await enqueueLinks({
        selector: 'ul.pagination.alphabet > li > a',
    });
});

router.addHandler('series_page', async ({ $, request }) => {
    const title = $('.block-title > h1').text().toLowerCase();
    const href = request.url;
    const img = $('.novel-cover > a > img').attr('src');
    const latestChapter = parseFloat(
        $('.novel-detail-body ul').eq(-1).eq(0).text().split(' ')[0]
    );
    const source = 'readlightnovel';

    await insertOneToDB('novel', {
        title,
        href,
        img,
        latestChapter,
        source,
    });
});
