import mysql from "mysql"

export const db=mysql.createConnection({
  connectionString: "postgresql://postgres.zijektluritjiogxsfkr:$HarshulSoni04@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
    ssl: {
        rejectUnauthorized: false // Required for Supabase connections
    }

});
db.connect((err) => {
    if (err) {
      console.error("Database connection failed: ", err);
    } else {
      console.log("Connected to the database");
    }
  });
