# Development environment
FROM node:24-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json & install dependencies
COPY package*.json ./

COPY . .