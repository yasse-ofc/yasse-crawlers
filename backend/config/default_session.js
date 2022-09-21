const axios = require('axios');
const UserAgent = require('user-agents');
const dotenv = require('dotenv').config();
const { HttpsProxyAgent } = require('https-proxy-agent');

const userAgent = new UserAgent();
const proxy_url = `http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASS}@p.webshare.io:80`;

function session() {
    return axios.create({
        proxy: false,
        headers: {
            'User-Agent': userAgent.random().toString(),
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': 1,
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-User': '?1',
        },
        timeout: process.env.TIMEOUT,
        httpsAgent: new HttpsProxyAgent(proxy_url),
    });
};

function manganato_session() {
    return session().create({
        headers: {
            'Host': 'manganato.com',
            'Referer': 'https://manganato.com/',
    }})
};

function brmangas_session() {
    return session().create({
        headers: {
            'Accept-Encoding': '',
            'Alt-Used': 'www.brmangas.net',
            'Host': 'www.brmangas.net',
    }})
};

function mangalivre_session() {
    return session().create({
        headers: {
            'Host': 'mangalivre.net',
    }})
};

function animeplanet_session() {
    return session().create({
        headers: {
            'Accept-Encoding': '',
            'Host': 'www.anime-planet.com',
    }})
};

function novelupdates_session() {
    return session().create({
        headers: {
            //'Accept-Encoding': '',
            //'Alt-Used': 'www.novelupdates.com',
            'Host': 'www.novelupdates.com',
            'Sec-Fetch-Site': 'cross-site',
    }})
};

module.exports = { session, manganato_session, brmangas_session,
                   mangalivre_session, animeplanet_session, proxy_url,
                   novelupdates_session };