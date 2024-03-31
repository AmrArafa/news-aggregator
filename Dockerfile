FROM node:20-alpine

WORKDIR /app

COPY src/ ./src
COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
