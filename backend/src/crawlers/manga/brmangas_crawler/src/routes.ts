import { Dataset, createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

let page_count = 0;

router.addDefaultHandler(async ({ enqueueLinks, log }) => {
    log.info(`[BRMANGAS] ${++page_count} page fetched.`);
    
    await enqueueLinks({
        globs: ['https://www.brmangas.net/manga/**'],
        label: 'manga_page'
    });

    await enqueueLinks({
        globs: ['https://www.brmangas.net/lista-de-manga/page/**'],
        label: 'manga_list_page'
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

router.addHandler('manga_list_page', async ({ enqueueLinks, log }) => {
    log.info(`[BRMANGAS] ${++page_count} pages fetched.`);
    
    await enqueueLinks({
        globs: ['https://www.brmangas.net/manga/**'],
        label: 'manga_page'
    });

    await enqueueLinks({
        globs: ['https://www.brmangas.net/lista-de-manga/page/**'],
        label: 'manga_list_page'
    });
});
