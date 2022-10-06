import { Dataset, createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ $ }) => {
    console.log($);
    
    /*const title = $('#siteContainer > h1').text().toLowerCase();
    const href = request.url;
    const img = $('.screenshots').eq(1).attr('src');
    const test = $.html();
    const latest_chapter = $('.card.landscape > a').eq(-1).text().split(' ').pop();
    const source = 'animeplanet';
    
    await Dataset.pushData({
        title,
        href,
        img,
        test,
        latest_chapter,
        source,
    });*/
});
