FROM node:14-alpine

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci

COPY tsconfig.json tsconfig.build.json .eslintrc.js .prettierrc /app/
COPY src /app/src
RUN npm run build

EXPOSE 3000
ENTRYPOINT ["npm", "run", "start:prod"]
