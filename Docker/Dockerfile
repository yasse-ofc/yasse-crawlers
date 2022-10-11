FROM node
RUN apt-get update && apt-get upgrade -y
RUN cd /opt; git clone https://github.com/ed-henrique/yasse.git
WORKDIR /opt/yasse
# RUN npm install
CMD ["cd","/opt/yasse/backend/","&&","npm", "i"]
CMD ["cd","/opt/yasse/frontend/","&&","npm", "i"]
CMD ["cd","/opt/yasse/backend/src/crawlers/cheerio_crawlers","&&","npm", "i"]
CMD ["cd","/opt/yasse/backend/src/crawlers/http_crawlers","&&","npm", "i"]
CMD ["cd","/opt/yasse/backend/src/crawlers/puppeteer_crawlers","&&","npm", "i"]
CMD ["cd","/opt/yasse/backend/src/db","&&","npm", "i"]
CMD ["cd","/opt/yasse/backend/src/db","&&","touch", ".env"]
CMD ["bash"]