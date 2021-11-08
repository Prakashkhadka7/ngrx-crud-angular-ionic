# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as node

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY . .

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build --prod

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=node /app/dist/ngrx-crud-example /usr/share/nginx/html

# Expose port 80
EXPOSE 80
