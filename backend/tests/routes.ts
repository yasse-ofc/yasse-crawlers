import { Dataset, createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ $, enqueueLinks, log }) => {
    log.info($('.lzComic__list').html() ?? '');

    await enqueueLinks({
        globs: ['https://www.lezhinus.com/en/comic/*'],
        label: 'webtoon_page'
    });

    /*await enqueueLinks({
        globs: ['https://www.brmangas.net/lista-de-manga/page/**'],
    });*/
});

router.addHandler('webtoon_page', async ({ $, request, log }) => {
    log.info($.html());

    const title = $('.comicInfo__title').text().toLowerCase();
    const href = request.url;
    const img = $('.comicInfo__cover > img').attr('src');
    const latest_chapter = $('.episode__title').eq(-1).text().split(' ')[-1];

    await Dataset.pushData({
        title,
        href,
        img,
        latest_chapter,
    });
});