## Step 1: Build the React app
FROM node:22 AS build
LABEL authors="Ypsi"

# Set working directory inside the container
WORKDIR /app

# Install Python and build dependencies for node-gyp
RUN apt-get update && \
    apt-get install -y python3 python3-pip build-essential python3-venv && \
    python3 -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade setuptools

# Install node-gyp
RUN npm install -g node-gyp

# Copy only dependency files to leverage Docker cache
COPY package*.json ./
COPY vite.config.js ./

RUN npm install

# Copy the rest of the application files
COPY . .

# Pass Vite build-time environment variables before building the bundle
ARG VITE_BDM_BASE_URL
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_DATABASE_URL
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID

ENV VITE_BDM_BASE_URL=$VITE_BDM_BASE_URL \
    VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY \
    VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN \
    VITE_FIREBASE_DATABASE_URL=$VITE_FIREBASE_DATABASE_URL \
    VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID \
    VITE_FIREBASE_STORAGE_BUCKET=$VITE_FIREBASE_STORAGE_BUCKET \
    VITE_FIREBASE_MESSAGING_SENDER_ID=$VITE_FIREBASE_MESSAGING_SENDER_ID \
    VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID

# Build the React app for production
RUN npm run build

## Step 2: Serve the built app with Nginx
FROM nginx:1.25-alpine

# Replace default Nginx config with a custom one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for incoming traffic
EXPOSE 80

# Start Nginx server in the foreground
CMD ["nginx", "-g", "daemon off;"]
