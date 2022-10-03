import { Dataset, createPuppeteerRouter } from 'crawlee';

export const router = createPuppeteerRouter();

router.addDefaultHandler(async ({ enqueueLinks }) => {
    await enqueueLinks({
        globs: ['https://www.lezhinus.com/en/comic/*'],
        label: 'webtoon_page'
    });
});

router.addHandler('webtoon_page', async ({ page, request }) => {
    const title = (await page.$eval('.comicInfo__title', el => el.textContent) ?? '').toLowerCase();
    const href = request.url;
    const img = await page.$eval('.comicInfo__cover > img', el => el.getAttribute('src'));
    const episode_to_check = await page.$$eval('.episode__name', eps => eps.map(e => e.textContent));
    const latest_chapter = (episode_to_check[episode_to_check.length - 1] == 'Epilogue') ?
        (parseInt(episode_to_check[episode_to_check.length - 2] ?? '') + 1).toString() :
        episode_to_check[episode_to_check.length - 1];

    await Dataset.pushData({
        title,
        href,
        img,
        latest_chapter,
    });
});