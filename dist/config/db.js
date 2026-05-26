import { Pool } from 'pg';
let pool = null;
export function getPool() {
    if (!pool) {
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) {
            throw new Error('DATABASE_URL is required');
        }
        pool = new Pool({
            connectionString,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
        });
    }
    return pool;
}
export async function testDatabaseConnection() {
    const client = await getPool().connect();
    try {
        await client.query('SELECT 1');
        return true;
    }
    finally {
        client.release();
    }
}
