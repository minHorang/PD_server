import { pool } from "../../config/db.js";
import { sql } from "./user.sql.js";

export const UserModel = {
  findById: async (userId) => {
    try {
      console.log(sql.findUserById);
      console.log(userId);
      const [results] = await pool.query(sql.findUserById, userId);
      return results[0];
    } catch (error) {
      throw new Error("유저 조회 실패");
    }
  },

  updateNickname: async (userId, nicknameData) => {
    try {
      console.log(sql.updateNicknameSQL);
      console.log(userId);
      console.log(nicknameData);
      await pool.query(sql.updateNicknameSQL, [nicknameData, userId]);
    } catch (error) {
      throw new Error("닉네임 변경 실패");
    }
  },

  patchStatus: async (userId) => {
    try {
      console.log(sql.updateStatusSQL);
      console.log(userId);
      await pool.query(sql.updateStatusSQL, ["inactive", userId]);
    } catch (error) {
      throw new Error("회원 탈퇴 실패");
    }
  },
};
