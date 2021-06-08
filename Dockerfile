FROM node:14.15

RUN mkdir -p /andre/app

WORKDIR /andre/app

ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "./"]

EXPOSE 3000

RUN npm install --production

COPY . .

CMD ["npm", "start"]