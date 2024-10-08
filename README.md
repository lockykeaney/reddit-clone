# Reddit Clone

Built entirely with JS

From the root of the project run `yarn` to install dependencies for all projects

---

## Component Library

All components built in isolation using [react-native](https://reactnative.dev/), transpiled for the web with [react-native-web](https://necolas.github.io/react-native-web/).

`yarn components:storybook` to develop the components buy themselves

`yarn components:build` to create the package that so it can be imported and used in the FE

`yarn components:watch` if you need to adjust and tweak the components as they are being used in the FE

Import the components to use from `@packages/components`

---

## API Server (NOT WORKING)

Express server with a MongoDB backend, running together in a docker orchestration. (Needs Docker installed to run)

`docker-compose up` to build and launch the backend.

---

## MongoDB from docker container

https://medium.com/@szpytfire/setting-up-mongodb-within-a-docker-container-for-local-development-327e32a2b68d

https://earthly.dev/blog/mongodb-docker/#:~:text=Running%20MongoDB%20in%20a%20Docker%20Container,-For%20development%2C%20it&text=You%20can%20pull%20the%20latest,Atlas%20or%20MongoDB%20Enterprise%20Server.&text=This%20will%20pull%20the%20latest%20official%20image%20from%20Docker%20Hub.

`docker pull mongo`

```
docker run
-d
--name reddit_clone_dev
-p 27017:27017
-e MONGO_INITDB_ROOT_username=mongo_dev
-e MONGO_INITDB_ROOT_PASSWORD=password
mongo
```

`docker container ls`

`docker exec -it reddit_clone_dev bash`

```
mongodb://mongo_dev:password@0.0.0.0:27017/
```
