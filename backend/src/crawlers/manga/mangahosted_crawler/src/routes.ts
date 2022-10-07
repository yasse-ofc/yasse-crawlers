import { Dataset, createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ enqueueLinks }) => {
    await enqueueLinks({
        globs: ['https://mangahosted.com/manga/*'],
        label: 'manga_page'
    });

    await enqueueLinks({
        globs: ['https://mangahosted.com/mangas/page/*'],
    });
});

router.addHandler('manga_page', async ({ $, request }) => {
    const title = $('h1.title').text().toLowerCase();
    const href = request.url;
    const img = $('.image-3').attr('src');
    const latest_chapter = $('.chapters > div > a').eq(0).text();
    const source = 'mangahosted';

    await Dataset.pushData({
        title,
        href,
        img,
        latest_chapter,
        source,
    });
});