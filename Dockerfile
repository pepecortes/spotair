FROM node:11
# you might use "alpine" if in production: the image is lighter

# Create app directory
WORKDIR /app

# install and editor just in case
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "nano"]

# copy some app starting files
# (app sources will be bound for development)
COPY ./app.js ./
COPY ./*.json ./
COPY ./.env ./
COPY ./webpack.config.js ./

# Install dependencies
# Copy both package.json AND package-lock.json
# COPY package*.json ./
RUN npm install
RUN npm install -g nodemon@^1.18.8
RUN npm install -g @vue/cli@^3.2.1

# If you are building your code for production
# RUN npm install --only=production

EXPOSE $PORT
#CMD [ "npm", "start" ]
CMD ["nodemon"]
