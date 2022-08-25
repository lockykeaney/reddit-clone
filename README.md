# Reddit Clone

### MongoDB from docker container

https://medium.com/@szpytfire/setting-up-mongodb-within-a-docker-container-for-local-development-327e32a2b68d

https://earthly.dev/blog/mongodb-docker/#:~:text=Running%20MongoDB%20in%20a%20Docker%20Container,-For%20development%2C%20it&text=You%20can%20pull%20the%20latest,Atlas%20or%20MongoDB%20Enterprise%20Server.&text=This%20will%20pull%20the%20latest%20official%20image%20from%20Docker%20Hub.

`docker pull mongo`

```
docker run
-d
--name reddit_clone_dev
-p 27017:27017
-e MONGO_INITDB_ROOT_USERNAME=mongo_dev
-e MONGO_INITDB_ROOT_PASSWORD=password
mongo
```

`docker container ls`

`docker exec -it reddit_clone_dev bash`

```
mongodb://mongo_dev:password@0.0.0.0:27017/
```
