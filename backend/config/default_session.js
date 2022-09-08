const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');

const session = axios.create({
    proxy: false,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    },
    timeout: 15000,
    httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASS}@p.webshare.io:80`)
});

module.exports = { session };