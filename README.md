# CareDrop Backend

TypeScript backend starter for a multi-vendor medical platform built with Node.js, Express, Prisma 7, and PostgreSQL.

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

4. Generate the Prisma client:

   ```bash
   npm run prisma:generate
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Build the project for production:

   ```bash
   npm run build
   ```

7. Start the compiled server:

   ```bash
   npm start
   ```

## Project Structure

- `src/app.ts` - Express app setup
- `src/server.ts` - Server bootstrap
- `prisma.config.ts` - Prisma CLI configuration and datasource URL
- `prisma/schema.prisma` - Prisma data model and generator setup
- `src/config/prisma.ts` - Prisma client singleton with PostgreSQL adapter
- `src/generated/prisma` - Generated Prisma Client output
- `src/modules/medicine` - Medicine feature module
- `src/modules/order` - Order feature module
- `src/middleware` - Shared middleware

## Health Check

After the server starts, visit `GET /health` to confirm the app is running.

## API Modules

- `GET /api/medicine` - Medicine module sample route
- `GET /api/orders` - Order module sample route