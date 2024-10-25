FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

RUN apk update && apk upgrade && apk add --no-cache openssl bash curl

COPY . .

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

EXPOSE 8080

CMD ["npm", "start"]
