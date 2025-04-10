import mysql from "mysql"

export const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"$HarshulSoni04",
    database:"blog"

});
db.connect((err) => {
    if (err) {
      console.error("Database connection failed: ", err);
    } else {
      console.log("Connected to the database");
    }
  });