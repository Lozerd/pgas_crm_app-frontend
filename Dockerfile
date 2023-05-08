FROM node:14.17.6

WORKDIR /frontend

COPY . /frontend/
COPY /.env /frontend/

RUN npm i
RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["npm", "start"]
