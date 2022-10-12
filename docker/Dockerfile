FROM node

RUN apt-get update && apt-get upgrade -y
RUN cd /opt; git clone https://github.com/ed-henrique/yasse.git &&\
    cd /opt/yasse/backend/ && npm i &&\
    cd /opt/yasse/backend/src/crawlers/cheerio_crawlers && npm i &&\
    cd /opt/yasse/backend/src/crawlers/http_crawlers && npm i &&\
    cd /opt/yasse/backend/src/crawlers/puppeteer_crawlers && npm i &&\
    cd /opt/yasse/frontend/ && npm i &&\
    cd /opt/yasse/backend/ && touch .env

WORKDIR /opt/yasse

CMD ["bash"]