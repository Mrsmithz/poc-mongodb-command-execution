FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive

WORKDIR /app

RUN apt-get update && apt-get install -y gnupg ca-certificates curl wget

RUN curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add

RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list

RUN wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2.20_amd64.deb

RUN dpkg -i libssl1.1_1.1.1f-1ubuntu2.20_amd64.deb

RUN apt update && apt install -y mongodb-org

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

RUN apt install -y nodejs

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

RUN mkdir -p /data/db

COPY start.sh .

RUN chmod +x start.sh

CMD ["./start.sh"]