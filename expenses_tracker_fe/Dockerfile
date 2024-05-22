FROM node:16

WORKDIR /client

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

ENV NODE_ENV development

EXPOSE 4000

CMD ["npm", "start"]
