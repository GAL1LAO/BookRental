# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the container's working directory
COPY package*.json ./

# Install application dependencies inside the container
RUN npm install

# Copy the local application files to the container's working directory
COPY . .

# Specifically ensure .env is copied after all other files
COPY .env .env

# Specify the port the application will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
