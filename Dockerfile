FROM node:20.13.1

COPY package*.json ./
COPY wash-430400-54296f32cbdf.json ./

COPY . .

RUN npm install


CMD ["npm", "start"]
