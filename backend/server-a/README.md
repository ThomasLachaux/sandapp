# Server A

This directory is for the code and documentation of the _server A_. A starter Dockerfile has been added, it has some comments to get you started.

For communicating with RabbitMQ, there are many possible approaches. In the `rabbit-utils`-directory, in _receiveTask.js_ and _sendTask.js_ files, you can see simple examples of code that can be integrated into Swagger server stub's `Order`-controller. These have been directly copied from RabbitMQ examples, and can be improved a lot for this system.

# How to run a local MongoDB instance

To run a local instance of MongoDB, first create a volume and run a Bitnami MongoDB container. It will have no security whatsoever so this is for local use only:

```
$ docker volume create mongodb-sandapp-local
```

```
$ docker run -d -p 27017:27017 \
--name mongodb \
-v mongodb-sandapp-local:/bitnami/mongodb \
bitnami/mongodb:latest
```
