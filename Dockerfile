FROM node:18

# Create the working directory
RUN mkdir -p /bot
WORKDIR /bot

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy the rest of the files
COPY * ./

# Start
CMD ["npm", "run start"]
