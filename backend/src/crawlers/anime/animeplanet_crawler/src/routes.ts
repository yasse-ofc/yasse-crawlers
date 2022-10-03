import { Dataset, createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ enqueueLinks }) => {
    await enqueueLinks({
        globs: [
            'https://www.anime-planet.com/anime/*',
            '!https://www.anime-planet.com/anime/all',
            '!https://www.anime-planet.com/anime/tags/',
            '!https://www.anime-planet.com/anime/tags/*',
            '!https://www.anime-planet.com/anime/seasons/*',
            '!https://www.anime-planet.com/anime/studios/',
            '!https://www.anime-planet.com/anime/studios/*',
            '!https://www.anime-planet.com/anime/all?page=*',
            '!https://www.anime-planet.com/anime/top-anime',
            '!https://www.anime-planet.com/anime/watch-online/',
            '!https://www.anime-planet.com/anime/watch-online/*',
            '!https://www.anime-planet.com/anime/primary/*',
            '!https://www.anime-planet.com/anime/recommendations/',
            '!https://www.anime-planet.com/anime/recommendations/*',
        ],
        label: 'manga_page'
    });
    
    await enqueueLinks({
        globs: [
            'https://www.anime-planet.com/anime/watch-online/alpha?page=*',
        ],
    });
});

router.addHandler('manga_page', async ({ $, request }) => {
    const title = $('#siteContainer > h1').text().toLowerCase();
    const href = request.url;
    const img = $('.screenshots').eq(1).attr('src');
    const latest_chapter = $('.lista_ep a').eq(-1).text().slice(9);
    const source = 'animeplanet';

    await Dataset.pushData({
        title,
        href,
        img,
        latest_chapter,
        source,
    });
});