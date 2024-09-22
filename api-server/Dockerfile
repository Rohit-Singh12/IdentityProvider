FROM node:lts

#Set working directory
WORKDIR /app

#Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

#Copy rest of the code to Container
COPY . .

#PORT ON WHICH APP WILL RUN
EXPOSE 4000

#RUN THE DOCKER
CMD ["npm", "start"]

