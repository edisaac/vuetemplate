# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY entrypoint.sh /usr/share/nginx/
RUN chmod +x /usr/share/nginx/entrypoint.sh
RUN apk update \
    && apk add jq \
    && rm -rf /var/cache/apk/*
ENTRYPOINT ["/usr/share/nginx/entrypoint.sh"]
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]