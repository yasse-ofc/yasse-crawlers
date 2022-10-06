import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as HttpsProxyAgent from 'https-proxy-agent';
import * as dotenv from 'dotenv';

dotenv.config();

const proxy_url = `http://${process.env.PROXY_USERNAME}:${process.env.PROXY_PASS}@p.webshare.io:80`;

async function crawler() {
    const session = axios.create({
        proxy: false,
        httpsAgent: HttpsProxyAgent(proxy_url)
    });
    
    axiosRetry(session, {
        retries: 5,
        retryDelay: axiosRetry.exponentialDelay,
    });

    const test = await session.get("https://goyabu.com/api/show2.php");

    console.log(test);
}

crawler();