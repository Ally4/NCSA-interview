# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of your app
COPY . .

# Expose the port your app runs on
EXPOSE 1234

# Run your backend
CMD ["node", "server.js"]
