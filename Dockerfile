FROM node:16

WORKDIR /service

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

EXPOSE 2323

CMD [ "npm", "run", "serve" ]