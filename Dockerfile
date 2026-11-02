FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma
RUN npx prisma generate
COPY tsconfig.json nest-cli.json ./
COPY src ./src
RUN npm run build

FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev && npm install tsx prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/dist ./dist
COPY prisma ./prisma
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && npx tsx prisma/seed.ts && node dist/main.js"]
