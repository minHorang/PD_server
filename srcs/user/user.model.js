import { pool } from "../../config/db.js";
import { sql } from "./user.sql.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = `cloudoort`;

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

  signup: async (signupInfo) => {
    try {
      const email = signupInfo.email;
      const [result] = await pool.query(sql.checkIdOverlap, email);
      if (result.length === 0) {
        console.log(signupInfo.email);
        await pool.query(sql.postNewUser, [
          signupInfo.email,
          signupInfo.password,
          "asdf",
          "active",
          "01023324232",
        ]);
      } else {
        return;
      }
    } catch (error) {
      throw new Error("회원 가입 실패");
    }
  },

  loginGeneral: async (loginInfo) => {
    try {
      const userInfo = await pool.query(sql.loginGeneralSQL, [
        loginInfo.email,
        loginInfo.password,
      ]);
      if (userInfo.length >= 1) {
        const payload = {
          id: userInfo[0][0].user_id,
          email: userInfo[0][0].email,
        };
        const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
        const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
        await pool.query(sql.postRefreshToken, [
          refreshToken,
          userInfo[0][0].user_id,
        ]);
        return { accessToken, refreshToken };
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("로그인 실패");
    }
  },

  findByEmail: async (email) => {
    try {
      const [results] = await pool.query(sql.findUserByEmail, email);
      return results[0];
    } catch (error) {
      throw new Error("유저 조회 실패");
    }
  },
};
