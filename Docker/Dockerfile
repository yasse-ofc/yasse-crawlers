FROM node
RUN apt-get update && apt-get upgrade -y
RUN cd /opt; git clone https://github.com/ed-henrique/yasse.git
WORKDIR /opt/yasse
# RUN npm install
CMD ["cd","/opt/yasse/backend/",";","npm", "install", "package.json"]
CMD ["cd","/opt/yasse/frontend/",";","npm", "install", "package.json"]
CMD ["bash"]