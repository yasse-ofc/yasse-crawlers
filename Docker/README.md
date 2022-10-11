# Yasse

Create image from a Dockfile:

Run the following command in the folder where the Dockerfile is located

```
docker build -t k/yasse:v0.01 .
```

To start the container from this image just run:

```
docker run -it --name yasse --hostname yasse k/yasse:v0.01
```

And then you will automatically be inside the container.

obs: This image contains the backend and frontend together.
