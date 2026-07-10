# Stage 1: Pruning
FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g pnpm turbo
COPY . .
RUN turbo prune api --docker

# Stage 2: Install dependencies & Build code
FROM node:22-alpine AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g pnpm

# Copy prune JSON files and install all dependencies
COPY --from=builder /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile

# Copy full source and build
COPY --from=builder /app/out/full/ .
# Generate prisma client using local version
RUN pnpm --filter api exec prisma generate
RUN pnpm --filter api build

# Prune devDependencies to keep the final runner image small
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --prod --frozen-lockfile

# Stage 3: Runner
FROM node:22-alpine AS runner
WORKDIR /app
RUN npm install -g pnpm

ENV NODE_ENV=production
ENV PORT=5001

# Copy built code and production node_modules
COPY --from=installer /app/apps/api/dist ./apps/api/dist
COPY --from=installer /app/apps/api/package.json ./apps/api/package.json
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=installer /app/package.json ./package.json
COPY --from=installer /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

EXPOSE 5001

CMD ["pnpm", "--filter", "api", "start"]
