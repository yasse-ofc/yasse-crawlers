FROM node

RUN apt-get update && apt-get upgrade -y
RUN cd /opt; git clone https://github.com/yasse-ofc/yasse-crawlers.git &&\
    cd /opt/yasse-crawlers && npm i && touch .env

WORKDIR /opt/yasse-crawlers

CMD ["bash"]