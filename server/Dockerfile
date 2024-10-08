FROM node:16-slim
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/
RUN NODE_OPTIONS=--max_old_space_size=16384
RUN npm install -g nodemon

COPY package.json .
RUN yarn install

COPY . .

EXPOSE 4000

CMD [ "yarn", "dev" ]