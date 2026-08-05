FROM node:22-alpine3.20 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine3.20 AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Standalone output (next.config.mjs: output: "standalone") — only the
# traced production node_modules + server, not the full node_modules tree.
FROM node:22-alpine3.20 AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

# Data written by the /dashboard admin panel — kept outside the image so it
# survives rebuilds/redeploys (see docker-compose.prod.yml volumes).
RUN mkdir -p data content/articles && chown -R node:node data content/articles

USER node
EXPOSE 3000
CMD ["node", "server.js"]
