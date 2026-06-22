# Hermes

## Current Status

Hermes is a collaborative workspace platform inspired by Discord, Slack, and Linear.

This repository currently contains:

* Turborepo monorepo setup
* Next.js web application scaffold
* Express API application scaffold
* Shared package structure
* Docker infrastructure setup
* PostgreSQL container
* Redis container
* MinIO container
* Project documentation structure

---

# Prerequisites

Required:

* Node.js 22+
* pnpm
* Docker Desktop
* WSL2 (recommended for Windows)

---

# Repository Structure

```text
Hermes/

apps/
├── web/
├── api/

packages/
├── shared/
├── types/
├── ui/
├── eslint-config/
└── typescript-config/

infra/
└── docker/

docs/
├── architecture/
├── database/
├── api/
└── product/
```

---

# Initial Setup

Clone the repository:

```bash
git clone <repository-url>
cd Hermes
```

Install dependencies:

```bash
pnpm install
```

---

# Start Local Infrastructure

Navigate to docker configuration:

```bash
cd infra/docker
```

Start services:

```bash
docker compose up -d
```

Verify containers:

```bash
docker ps
```

Expected containers:

* hermes-postgres
* hermes-redis
* hermes-minio

---

# Local Services

PostgreSQL

```text
localhost:5434
```

Redis

```text
localhost:6380
```

MinIO API

```text
http://localhost:9000
```

MinIO Console

```text
http://localhost:9001
```

Default MinIO Credentials:

```text
username: admin
password: admin12345
```

---

# Current Development Phase

Infrastructure Foundation

Completed:

* Monorepo setup
* Docker setup
* PostgreSQL setup
* Redis setup
* MinIO setup

Upcoming:

* Prisma setup
* Database schema design
* Authentication module
* Workspace module
* Channel module
* Messaging module

---

# Team Workflow

Before starting work:

```bash
git pull origin main
pnpm install

cd infra/docker
docker compose up -d
```

Verify services are running before development begins.
