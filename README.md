# Ride Sharing

# Ride Sharing API

**Ride Sharing API** built with [NestJS](https://nestjs.com/) and managed with [pnpm](https://pnpm.io/).

---

## Features

- Authentication

---

## Tech Stack

| Category                 | Technology       |
| ------------------------ | ---------------- |
| **Runtime**              | Node.js          |
| **Framework**            | NestJS           |
| **Package Manager**      | pnpm             |
| **Language**             | TypeScript       |
| **Linting & Formatting** | ESLint, Prettier |

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/pagevamp/traineeship-final-project-backend.git
cd ./traineeship-final-project-backend/
```

### 2. Install dependencies

Using **pnpm**:

```bash
pnpm install
```

If you don’t have pnpm installed:

```bash
npm install -g pnpm
```

---

## Configuration

Create a `.env.development` file in the project root (or copy from `.env.example`) and set up your environment variables:

```bash
PORT=postgres
DB_HOST=db
DB_PORT=postgres
DB_USER=postgres
DB_PASSWORD=postgres

```

---

## Running the Application

Run the command `pnpm start` to run the project

| Environment     | Command                         | Description                 |
| --------------- | ------------------------------- | --------------------------- |
| **Development** | `pnpm start:dev`                | Start the app in watch mode |
| **Production**  | `pnpm build && pnpm start:prod` | Build and run compiled code |
| **Debug Mode**  | `pnpm start:debug`              | Run with debugging enabled  |

---

## Development Tools

- **Nest CLI:** for scaffolding and building features
- **Prettier:** for consistent code formatting
- **ESLint:** for static code analysis and code style enforcement

---
