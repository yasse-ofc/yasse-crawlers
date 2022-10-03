const axios = require('axios');
const { test_session } = require('../config/default_session');

const list = [
    //{ name: '[WEBTOON] Lezhinus',    link: 'https://www.lezhinus.com/en' },
    //{ name: '[ANIME] 9 Anime',       link: 'https://9anime.vc' },
    //{ name: '[MANGA] BR Mangas',     link: 'https://www.brmangas.net' },
    //{ name: '[MANGA] Manganato',     link: 'https://www.manganato.com' },
    { name: 'WIP_[ANIME] Anime Planet',  link: 'https://www.anime-planet.com' },
    { name: '[ANIME] Goyabu',        link: 'https://goyabu.com' },
    { name: '[ANIME] Anitube',       link: 'https://www.anitube.site' },
    { name: '[ANIME] XP Animes',     link: 'https://xpanimes.com/' },
    { name: '[ANIME] Anime Fire',    link: 'https://animefire.net' },
    { name: '[ANIME] Crunchy Roll',  link: 'https://www.crunchyroll.com' },
    { name: '[ANIME] Animes Online', link: 'https://animesonline.cc' },
    { name: '[MANGA] Manga Vibe',    link: 'https://mangavibe.top' },
    { name: '[MANGA] Manga Toon',    link: 'https://mangatoon.mobi' },
    { name: '[MANGA] Manga Host',    link: 'https://mangahosted.com' },
    { name: '[MANGA] Union Leitor',  link: 'https://unionleitor.top' },
    { name: '[MANGA] Manga Livre',   link: 'https://www.mangalivre.net' },
    { name: '[NOVEL] Novel Updates', link: 'https://www.novelupdates.com' },
    { name: '[WEBTOON] Tappy Toon',  link: 'https://www.tappytoon.com/en/home/comics' },
    { name: 'mangareader',           link: 'https://mangareader.to' },
    { name: '4anime',                link: 'https://4anime.gg' },
    { name: 'mangabuddy',            link: 'https://mangabuddy.com' },
    { name: 'mangastic',             link: 'https://mangastic.me' },
    { name: 'mangazim',              link: 'https://mangazim.com' },
    { name: 'animesonehd',           link: 'https://animesonehd.cc' },
    { name: 'animesbr',              link: 'https://animesbr.biz' },
    { name: 'subanimes',             link: 'https://subanimes.cc' },
    { name: 'meusanimes',            link: 'https://meusanimes.net' },
    { name: 'goyabu2',               link: 'https://goyabu.org' },
    { name: 'animeyabu',             link: 'https://animeyabu.com' },
    { name: 'animesonlinehd',        link: 'https://animesonlinehd.vip' },
    { name: 'animesup',              link: 'http://animesup.biz' },
    { name: 'meusanimes',            link: 'https://meusanimes.org' },
    { name: 'animesrubro',           link: 'https://animesrubro.net/lista-de-animes' },
    { name: 'listadeanimes',         link: 'https://www.listadeanimes.com' },
    { name: 'betteranime',           link: 'https://betteranime.net' },
    { name: 'animefan',              link: 'https://animefan.cc' },
    { name: 'animezeira',            link: 'https://animezeira.net' },
    { name: 'animesonlinen',         link: 'https://animesonlinen.com' },
    { name: 'veranimesonline',       link: 'https://veanimesonline.com' },
    { name: 'dattebane', link: 'http://www.dattebane.com' },
    { name: 'animexhd', link: 'https://animexhd.com' },
    { name: 'leitor', link: 'https://leitor.net' },
    { name: 'mangadex', link: 'https://mangadex.org' },
    { name: 'mangayabu', link: 'https://mangayabu.top' },
    { name: 'muitomanga', link: 'https://muitomanga.com' },
    { name: 'goldenmangas', link: 'https://goldenmangas.top' },
    { name: 'meusmangas', link: 'https://meusmangas.net/comienzo' },
    { name: 'mangaschan', link: 'https://mangaschan.com' },
    { name: 'yesmangas1', link: 'https://yesmangas1.com' },
    { name: 'neoxscans', link: 'https://neoxscans.net' },
    { name: 'mugiwarasoficial', link: 'https://mugiwarasoficial.com' },
    { name: 'markscans', link: 'https://markscans.online' },
    { name: 'mundomangakun', link: 'https://mundomangakun.com.br' },
    { name: 'reaperscans', link: 'https://reaperscans.com.br' },
    { name: 'onepieceex', link: 'https://onepieceex.net' },
    { name: 'leercapitulo', link: 'https://www.leercapitulo.com' },
    { name: 'mangalivre2', link: 'https://mangalivre.biz' },
    { name: 'anzmangashd', link: 'https://www.anzmangashd.com' },
    { name: 'mundowebtoon', link: 'https://mundowebtoon.com' },
    { name: 'prismascans', link: 'https://prismascans.net' },
    { name: 'mangasoverall', link: 'https://mangasoverall.com' },
    { name: 'lectortmo', link: 'https://lectortmo.com' },
    { name: 'taosect', link: 'https://taosect.com/leitor-online' },
    { name: 'lightnovelreader', link: 'https://lightnovelreader.org' },
    { name: 'lightnovelpub', link: 'https://www.lightnovelpub.com/hub_23091702' },
    { name: 'readwn', link: 'https://www.readwn.com' },
    { name: 'readlightnovel', link: 'https://www.readlightnovel.me/hub' },
    { name: 'wuxiaworld', link: 'https://wuxiaworld.site' },
    { name: 'mtlnovel', link: 'https://www.mtlnovel.com' },
    { name: 'webnovel', link: 'https://www.webnovel.com' },
    { name: '1stkissnovel', link: 'https://1stkissnovel.love/home-novel' },
    { name: 'fullnovels', link: 'https://fullnovels.com' },
    { name: 'freewebnovel', link: 'https://freewebnovel.org' },
    { name: 'mwebnovel', link: 'https://m.webnovel.com' },
    { name: 'lightnovelupdates', link: 'https://www.lightnovelupdates.com' },
    { name: 'wuxiaworldsite', link: 'https://wuxiaworldsite.com' },
    { name: 'wuxiaworld2', link: 'https://www.wuxiaworld.com' },
    { name: 'allnovelfull', link: 'https://allnovelfull.com' },
    { name: 'novelcool', link: 'https://novelcool.com' },
    { name: 'foxaholic', link: 'https://www.foxaholic.com' },
    { name: 'lightnovelspot', link: 'https://www.lightnovelspot.com' },
    { name: 'novelmt', link: 'https://www.novelmt.com' },
    { name: 'novelmtl', link: 'https://www.novelmtl.com' },
    { name: 'chysanthemumgarden', link: 'https://chrysanthemumgarden.com' },
    { name: 'mangaclash', link: 'https://mangaclash.com' },
    { name: 'webtoons', link: 'https://www.webtoons.com/en' },
    { name: 'nisakadhatu', link: 'https://www.nisakadhatu.com' },
    { name: 'mangaweebs', link: 'https://mangaweebs.in' },
    { name: 'tapas', link: 'https://tapas.io' },
    { name: '1stkissmanga', link: 'https://1stkissmanga.io' },
    { name: 'mangagg', link: 'https://mangagg.com' },
    { name: 'manhwatop', link: 'https://manhwatop.com' },
    { name: 'x2mangas', link: 'https://x2manga.com' },
];

describe('Checking Cloudflare Blocking', () => {
    list.forEach(async link => {
        it(`Checking ${link.name}`, async () => {
            const session = await test_session();
            let check = null;

            await session.get(link.link)
            .then( res => { check = res.status })
            .catch(err => { 
                if (err.response.status != undefined) check = err.response.status
                else check = err;
            });

            expect(check).toBe(200);
        }, 20000);
    });
});