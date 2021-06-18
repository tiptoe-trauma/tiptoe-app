FROM alpine:latest as angular-builder
RUN apk add --update nodejs npm

COPY . /code
RUN cd /code && \
		rm -rf node_modeules && \
    npm install && \
    npx ng build --prod

FROM nginxinc/nginx-unprivileged as cafe-static

COPY --from=angular-builder /code/dist/ /www
COPY --from=angular-builder /code/src/images /www/images

EXPOSE 8080