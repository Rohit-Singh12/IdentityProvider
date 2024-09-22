# Use Node.js LTS version as the base image
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the code to the container
COPY . .

# Expose the port your app will run on
EXPOSE 3001

# Start the server
CMD ["node", "index.js"]
