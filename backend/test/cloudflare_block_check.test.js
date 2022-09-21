const axios = require('axios');
const { test_session } = require('../config/default_session');

const list = [
    { name: 'goyabu', link: 'https://goyabu.com' },
    { name: 'xpanimes', link: 'https://xpanimes.com/' },
    { name: 'animefire', link: 'https://animefire.net' },
    { name: 'mangavibe', link: 'https://mangavibe.top' },
    { name: 'anitube', link: 'https://www.anitube.site' },
    { name: 'mangatoon', link: 'https://mangatoon.mobi' },
    { name: 'brmangas', link: 'https://www.brmangas.net' },
    { name: 'mangahost', link: 'https://mangahosted.com' },
    { name: 'manganato', link: 'https://www.manganato.com' },
    { name: 'unionleitor', link: 'https://unionleitor.top' },
    { name: 'mangalivre', link: 'https://www.mangalivre.net' },
    { name: 'animeplanet', link: 'https://www.anime-planet.com' },
    { name: 'novelupdates', link: 'https://www.novelupdates.com' },
    { name: 'animesonline', link: 'https://animesonline.cc' },
];

describe('Checking Cloudflare Blocking', () => {
    list.forEach(async link => {
        it(`Checking ${link.name}`, async () => {
            const session = await test_session();
            let check = null;

            await session.get(link.link)
            .then( res => { check = res.status })
            .catch(err => { check = err.response.status });

            expect(check).toBe(200);
        }, 20000);
    });
});