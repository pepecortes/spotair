## Specifies the base image we're extending
FROM node:11

## Create base directory
RUN mkdir /src

## Specify the "working directory" for the rest of the Dockerfile
WORKDIR /src

## Install packages using NPM xx (bundled with the node:xx image)
COPY ./package.json /src/package.json
#COPY ./package-lock.json /src/package-lock.json
RUN npm install --silent

## Add application code
COPY ./app_api /src/app_api
COPY ./app_client /src/app_client
COPY ./bin /src/bin
COPY ./public /src/public

## Add the nodemon configuration file
COPY ./nodemon.json /src/nodemon.json

## Set environment to "development" by default
ENV NODE_ENV development

## Allows port 3000 to be publicly available
EXPOSE 3000

## The command uses nodemon to run the application
CMD ["node", "node_modules/.bin/nodemon", "-L", "bin/www"]
