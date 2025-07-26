# Use Node.js base image
FROM node:22.1

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining files
COPY . .

# Expose dev server port
EXPOSE 5173

# Run the Vite dev server
CMD ["npm", "run", "dev"]
