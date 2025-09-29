# syntax=docker/dockerfile:1
FROM node:20-alpine AS base
WORKDIR /app

# Install openssl for Prisma
RUN apk add --no-cache openssl

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev

COPY prisma ./prisma
RUN npx prisma generate || true

COPY . .

ENV PORT=4000
EXPOSE 4000

CMD ["node", "server.js"]
