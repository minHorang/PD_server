import { pool } from "../../config/db.js";
import { sql } from "./user.sql.js";

export const UserModel = {
  findById: async (userId) => {
    try {
      console.log(sql.findUserById);
      console.log(userId);
      const [results] = await pool.query(sql.findUserById, [userId]);
      return results[0];
    } catch (error) {
      throw new Error("유저 조회 실패");
    }
  },
};
