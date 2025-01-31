### build environment
ARG NODE_VERSION=23-alpine
FROM node:${NODE_VERSION} as build

ARG NPM_VERSION=latest
RUN npm -g i npm@${NPM_VERSION}

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH


WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install


RUN apk update && apk upgrade && apk add --no-cache openssl bash curl

COPY . .

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
ENV NODE_OPTIONS="--max_old_space_size=4096"

RUN if [ "$NODE_ENV" = "production" ]; then \
        echo "Production mode"; \
    else \
        echo "Development mode"; \
    fi

EXPOSE 8080

CMD ["npm", "run", "dev"]
