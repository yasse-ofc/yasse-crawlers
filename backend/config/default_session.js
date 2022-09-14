const axios = require('axios');
const UserAgent = require('user-agents');
const dotenv = require('dotenv').config();
const { HttpsProxyAgent } = require('https-proxy-agent');

const userAgent = new UserAgent();

function session() {
    const session = axios.create({
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
        timeout: 30000,
        httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASS}@p.webshare.io:80`),
    });

    return session;
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
            'Alt-Used': 'www.brmangas.net',
            'Host': 'www.brmangas.net',
            'Referer': 'https://www.brmangas.net/',
    }})
};

module.exports = { session, manganato_session, brmangas_session };