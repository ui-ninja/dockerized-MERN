FROM node:20.5.1-bookworm-slim as Builder
WORKDIR /usr/multi-container/client
COPY package*.json /usr/multi-container/client/
RUN npm ci
COPY . /usr/multi-container/client/
RUN npm run build


FROM nginx
EXPOSE 3000
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=Builder /usr/multi-container/client/dist /usr/share/nginx/html