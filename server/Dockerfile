FROM node:14-slim
RUN NODE_OPTIONS=--max_old_space_size=8192
RUN npm install -g nodemon
COPY package.json .
EXPOSE 4000
RUN yarn install
COPY . .
RUN ls -l
CMD [ "nodemon", "index.js" ]