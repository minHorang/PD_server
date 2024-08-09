import { pool } from "../../config/db.js";
import { sql } from "./study.sql.js";

export const StudyModel = {
  findFolderById: async (folderId) => {
    try {
      const [results] = await pool.query(sql.findFolderById, [folderId]);
      return results[0];
    } catch (error) {
      console.error("폴더 조회 실패:", error.message);
      throw new Error("폴더 조회 실패");
    }
  },

  findProblemIdsByFolderId: async (folderId) => {
    try {
      const [results] = await pool.query(sql.findProblemIdsByFolderId, [folderId]);
      return results.map(row => row.problem_id);
    } catch (error) {
      console.error("문제 ID 조회 실패:", error.message);
      throw new Error("문제 ID 조회 실패");
    }
  },

  findProgressByFolderId: async (folderId) => {
    try {
      const [results] = await pool.query(sql.findProgressByFolderId, [folderId]);
      return results;
    } catch (error) {
      console.error("풀이 진척도 조회 실패:", error.message);
      throw new Error("풀이 진척도 조회 실패");
    }
  },

  findAnswerByProblemId: async (problemId) => {
    try {
      const [results] = await pool.query(sql.findAnswerByProblemId, [problemId]);
      return results[0];
    } catch (error) {
      console.error("정답 조회 실패:", error.message);
      throw new Error("정답 조회 실패");
    }
  },

  updateCorrectCount: async (problemId) => {
    try {
      await pool.query(sql.updateCorrectCount, [problemId]);
    } catch (error) {
      console.error("맞춘 횟수 업데이트 실패:", error.message);
      throw new Error("맞춘 횟수 업데이트 실패");
    }
  },

  updateIncorrectCount: async (problemId) => {
    try {
      await pool.query(sql.updateIncorrectCount, [problemId]);
    } catch (error) {
      console.error("틀린 횟수 업데이트 실패:", error.message);
      throw new Error("틀린 횟수 업데이트 실패");
    }
  }
};
