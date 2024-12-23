# First Stage
FROM node:20-alpine AS installer
WORKDIR /usr/app

COPY package*.json .

RUN npm install

# Second Stage
# Using Alpine images to curb down the image size
FROM node:20-alpine as release

WORKDIR /usr/app

COPY --from=installer /usr/app /usr/app
COPY . .
EXPOSE 5173

RUN npm run build
CMD ["node", "./build/server/index.js"]
