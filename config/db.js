import mysql from "mysql2/promise";

export const pool = await mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  port: 3306,
  database: "PD",
  password: "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
