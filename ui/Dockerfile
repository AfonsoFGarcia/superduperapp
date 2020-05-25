FROM node:current as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install --silent
COPY tsconfig.json .
CMD ["npm", "start"]