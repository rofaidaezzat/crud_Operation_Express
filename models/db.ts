import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Prefer single DATABASE_URL/POSTGRES_URL on Vercel; fallback to individual vars
const connectionString =
  process.env.DATABASE_URL || process.env.POSTGRES_URL || undefined;

const pool = new Pool(
  connectionString
    ? {
        connectionString,
        ssl: { rejectUnauthorized: false },
      }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
        ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
      }
);
export default pool;