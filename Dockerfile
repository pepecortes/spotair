FROM node:11
# you might use "alpine" if in production: the image is lighter

# Create app directory
WORKDIR /app

# copy some app starting files
# (app sources will be bound for development)
COPY ./app.js ./
COPY ./*.json ./
COPY ./.env ./

# Install dependencies
# Copy both package.json AND package-lock.json
# COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
# If you are building your code for production
# RUN npm install --only=production



EXPOSE $PORT
#CMD [ "npm", "start" ]
CMD ["nodemon"]
