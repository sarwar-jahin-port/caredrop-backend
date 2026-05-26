# CareDrop Backend

TypeScript backend starter for a multi-vendor medical platform built with Node.js, Express, and PostgreSQL.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your environment file:

   ```bash
   Copy-Item .env.example .env
   ```

3. Update `DATABASE_URL` in `.env`.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Build the project for production:

   ```bash
   npm run build
   ```

6. Start the compiled server:

   ```bash
   npm start
   ```

## Project Structure

- `src/app.ts` - Express app setup
- `src/server.ts` - Server bootstrap
- `src/config/db.ts` - PostgreSQL connection pool
- `src/modules/medicine` - Medicine feature module
- `src/modules/order` - Order feature module
- `src/middleware` - Shared middleware

## Health Check

After the server starts, visit `GET /health` to confirm the app is running.

## API Modules

- `GET /api/medicine` - Medicine module sample route
- `GET /api/orders` - Order module sample route