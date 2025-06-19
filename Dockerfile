# build stage
FROM node:20-alpine as build-stage
WORKDIR /app
COPY ./package*.json ./
COPY ./.npmrc ./
RUN npm ci

#Moving folders
COPY ./src ./src
#Moving single files
COPY ./index.html ./
COPY ./pageWithReact.html ./
COPY ./secondPage.html ./
COPY ./vite.config.js ./

# Build the project
RUN npm run build

# production stage
FROM nginx as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
