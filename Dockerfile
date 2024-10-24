FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install --quiet

#RUN apk update \
#    && apk upgrade \
#    && apk add --no-cache openssl bash curl

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
