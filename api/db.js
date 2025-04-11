import pkg from 'pg';
const { Pool } = pkg;

export const db = new Pool({
  connectionString: "postgresql://postgres.zijektluritjiogxsfkr:$HarshulSoni04@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
  ssl: {
    rejectUnauthorized: false, // Required for Supabase connections
  },
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to the PostgreSQL database");
  }
});
