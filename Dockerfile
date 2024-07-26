FROM node:20.13.1

COPY package*.json ./

COPY . .

RUN npm install


CMD ["npm", "start"]
