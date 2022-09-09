const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');

const session = axios.create({
    proxy: false,
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    },
    timeout: 30000,
    httpsAgent: new HttpsProxyAgent(`http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASS}@p.webshare.io:80`)
});

module.exports = { session };