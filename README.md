# SUNOSAVE

Save lyrics and prompts for SUNO.AI

## Prerequisites

- Node.js
- Docker Desktop
- npm or yarn

## Project Structure

## Features

- Save prompts
- Save lyrics

## Views

- Dashboard
- Save prompt form

## Form

- Title - _required_
- Prompt - _required_
- Lyrics - _optional_

## Data

```
const SUNOSAVE = {
  id: number,
  title: string,
  prompt: string,
  lyrics: string,
  date: date,
}
```

## Tech Stack

- Prisma ORM
- Postgres

- React
- Express

## Setup Instructions

1. Start the Database:

```bash
# Start PostgreSQL container
docker-compose up -d
```

2. Server Setup:

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Generate Prisma client
npm run generate

# Run database migrations
npm run migrate

# Seed the database with initial data
npx prisma db seed

# Start the server
npm run start
```

3. Client Setup:

```bash
# In a new terminal, navigate to client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Available Scripts

### Server

- `npm run generate` - Generate Prisma client
- `npm run migrate` - Run database migrations
- `npm run studio` - Open Prisma Studio
- `npm run start` - Start the server

### Client

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## GraphQL API

The GraphQL playground is available at `http://localhost:3000/graphql` when the server is running.

## Database Management

- Prisma Studio: `http://localhost:5555` (run `npm run studio` in server directory)
- PostgreSQL Database: `localhost:5432`
