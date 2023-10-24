FROM node:20.5.1-bookworm-slim
WORKDIR /usr/multi-container/server
COPY package*.json /usr/multi-container/server/
RUN npm ci
COPY . /usr/multi-container/server/
EXPOSE 3001
CMD ["npm", "start"]