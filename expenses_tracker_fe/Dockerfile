FROM node

WORKDIR /client
COPY package.json .

COPY package.json ./client/package.json
COPY package-lock.json ./client/package-lock.json
RUN npm install

COPY . ./
ENV NODE_ENV development
EXPOSE 4000

CMD ["npm", "start"]