# Express TypeScript Backend Starter

A small Express.js backend starter using TypeScript and Docker.


## Runtime

This starter targets Node.js 24 LTS and uses the `node:24-alpine` Docker image.

## Run locally

```bash
cp .env.example .env
npm install
npm run dev
```

Server runs at:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

## Run with Docker

```bash
cp .env.example .env
docker compose up --build
```

## Production build

```bash
npm run build
npm start
```

## Scripts

```text
npm run dev       Start development server with hot reload
npm run build     Compile TypeScript to dist/
npm start         Run compiled server
npm run typecheck Check TypeScript types
```
