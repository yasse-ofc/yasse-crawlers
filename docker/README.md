# Yasse

Create image from a Dockerfile:

Run the following command in the folder where the Dockerfile is located:

```bash
docker build -t k/yasse:v0.01 .
```

To start the container from this image, run:

```bash
docker run -it --name yasse --hostname yasse k/yasse:v0.01
```

And then you will automatically be inside the container.

OBS: This image contains both the backend and the frontend together.
