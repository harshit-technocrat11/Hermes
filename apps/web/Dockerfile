# Stage 1: Pruning
FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g pnpm turbo

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/package.json
COPY apps/web/tsconfig.json ./apps/web/tsconfig.json
COPY packages ./packages

RUN turbo prune web --docker

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

# Build-time environment variables for Next.js static compilation
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm --filter web build

# Prune devDependencies to keep the final runner image small
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --prod --frozen-lockfile

# Stage 3: Runner
FROM node:22-alpine AS runner
WORKDIR /app
RUN npm install -g pnpm

ENV NODE_ENV=production
ENV PORT=3000

# Copy built app and dependencies
COPY --from=installer /app/apps/web/.next ./apps/web/.next

COPY --from=installer /app/apps/web/package.json ./apps/web/package.json
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=installer /app/package.json ./package.json
COPY --from=installer /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

EXPOSE 3000

CMD ["pnpm", "--filter", "web", "start"]
