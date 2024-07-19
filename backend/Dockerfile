FROM node:alpine

WORKDIR /app

COPY  package.json .

RUN npm i

COPY . .

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

CMD /wait && npm run migration:run && npm run dev