import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = await mysql.createPool({
  host: "localhost",
  user: "root",
  port: 3306,
  database: "PD",
  password: "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
