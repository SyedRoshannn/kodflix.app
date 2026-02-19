import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL
    ? process.env.DATABASE_URL.replace("?sslmode=require", "").replace("&sslmode=require", "")
    : "";

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false, // Required for Aiven if CA cert is not provided
    },
});

export default pool;
