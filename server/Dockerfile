FROM node:24-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM deps AS dev
WORKDIR /app

ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_INTERVAL=100

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]

FROM deps AS build
WORKDIR /app

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

FROM node:24-alpine AS prod
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/server.js"]