import { Dataset, createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ enqueueLinks }) => {
    await enqueueLinks({
        globs: ['https://www.brmangas.net/manga/**'],
        label: 'manga_page'
    });

    await enqueueLinks({
        globs: ['https://www.brmangas.net/lista-de-manga/page/**'],
    });
});

router.addHandler('manga_page', async ({ $, request }) => {
    const title = $('.titulo').eq(0).text().slice(4, -7).toLowerCase();
    const href = request.url;
    const img = $('.img-responsive').eq(1).attr('src');
    const latest_chapter = $('.lista_ep a').eq(-1).text().slice(9);

    await Dataset.pushData({
        title,
        href,
        img,
        latest_chapter,
    });
});