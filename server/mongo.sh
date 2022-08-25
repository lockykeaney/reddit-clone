docker run
-d
--name reddit_clone_dev
-p 27017:27017
-e MONGO_INITDB_ROOT_USERNAME=mongo_dev
-e MONGO_INITDB_ROOT_PASSWORD=password
mongo
