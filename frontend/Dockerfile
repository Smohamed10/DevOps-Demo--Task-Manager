FROM node:24-alpine

WORKDIR /app

# Copy only package files first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy rest of project
COPY . .

# Start app
CMD ["npm", "start"]
