FROM node:16.14.2-alpine3.15

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install rimraf

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:watch"]
