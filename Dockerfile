## Step 1: Build the React app
FROM node:18 AS build
LABEL authors="Ypsil"

# Set working directory inside the container
WORKDIR /app

# Copy only dependency files to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

## Step 2: Serve the built app with Nginx
FROM nginx:alpine

# Replace default Nginx config with a custom one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for incoming traffic
EXPOSE 80

# Start Nginx server in the foreground
CMD ["nginx", "-g", "daemon off;"]
