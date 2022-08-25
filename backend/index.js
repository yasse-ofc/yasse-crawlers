const axios = require('axios');
const cheerio = require('cheerio');
const { CookieJar } = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');

const jar = new CookieJar();
const session = wrapper(
    axios.create({
        jar: jar,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    })
);

async function setLocale(currency, region) {
    let _prewalk = await session.get('https://etsy.com');
    let tree = cheerio.load(_prewalk.data);
    let csrf = tree('meta[name=csrf_nonce]').attr('content');

    try {
        let resp = await session.post(
            'https://etsy.com/api/v3/ajax/member/locale-preferences',
            {currency:currency, language:"en-US", region:region},
            {headers: {'x-csrf-token': csrf}},
        );
    } catch (error) {
        console.error(error);
    }
}

setLocale('USD', 'US');