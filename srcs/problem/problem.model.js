import { pool } from "../../config/db.js"; 
import { sql } from "./problem.sql.js"; 

export const ProblemModel = {
  search: async (query, folderId) => {
    try {
      const queryStr = folderId ? sql.searchProblemByFolder : sql.searchProblem;
      const values = folderId ? [`%${query}%`, folderId] : [`%${query}%`];
      const [results] = await pool.query(queryStr, values);
      return results;
    } catch (error) {
      throw new Error("문제 검색 실패");
    }
  },

  findById: async (problemId) => {
    try {
      const [results] = await pool.query(sql.findProblemById, [problemId]);
      if (results.length === 0) {
        return null;
      }
      return results[0];
    } catch (error) {
      console.error("문제 조회 실패:", error.message);
      throw new Error("문제 조회 실패");
    }
  },

  findPhotosByProblemId: async (problemId) => {
    try {
      const [results] = await pool.query(sql.findPhotosByProblemId, [problemId]);
      return results;
    } catch (error) {
      console.error("사진 조회 실패:", error.message);
      throw new Error("사진 조회 실패");
    }
  },


  findTypesByProblemId: async (problemId) => {
    try {
      const [results] = await pool.query(sql.findTypesByProblemId, [problemId]);
      return results;
    } catch (error) {
      console.error("유형 조회 실패:", error.message);
      throw new Error("유형 조회 실패");
    }
  },
  
  update: async (problemId, problemData) => {
    try {
      const { problemText, problemType } = problemData;
      await pool.query(sql.updateProblem, [problemText, problemId]);
    } catch (error) {
      throw new Error("문제 수정 실패");
    }
  }
};
