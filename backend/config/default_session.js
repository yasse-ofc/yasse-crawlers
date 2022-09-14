const axios = require('axios');
const UserAgent = require('user-agents');
const axiosRetry = require('axios-retry');
const dotenv = require('dotenv').config();
const { HttpsProxyAgent } = require('https-proxy-agent');

const userAgent = new UserAgent();

function session() {
    const session = axios.create({
        proxy: false,
        headers: {
            'User-Agent': userAgent.random().toString(),
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        },
        timeout: 30000,
        httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASS}@p.webshare.io:80`),
    });
    axiosRetry(session, {
        retries: 3,
        retryDelay: axiosRetry.exponentialDelay,
        onRetry: (retryCount, error, requestConfig) => {
            console.log(`Retrying for the ${retryCount} time...`);
        }
    });

    return session;
};

function manganato_session() {
    return session().create({
        headers: {
            'User-Agent': userAgent.random().toString(),
            'Host': 'manganato.com',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': 'https://manganato.com/',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': 1,
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-User': '?1',
    }})
};

module.exports = { session, manganato_session };