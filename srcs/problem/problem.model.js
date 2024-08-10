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
        console.log(sql.findProblemById);
        console.log(problemId);
      const [results] = await pool.query(sql.findProblemById, [problemId]);
      return results[0];
    } catch (error) {
      throw new Error("문제 조회 실패");
    }
  },

  update: async (problemId, problemData) => {
    try {
      const { problemText, problemType } = problemData;
      await pool.query(sql.updateProblem, [problemText, problemId]);
    } catch (error) {
      throw new Error("문제 수정 실패");
    }
  },


  create: async (problemData) => {
    const {
      folderId, userId, problemText, answer, status,
      correctCount, incorrectCount, orderValue,
      subscriptionPlan, mainCategory, category, subCategory,
      photos, memo
    } = problemData;

    try {
      // 문제 데이터 삽입
      const [result] = await pool.query(sql.addProblem, [
        folderId, userId, problemText, answer, status,
        correctCount, incorrectCount, orderValue,
        subscriptionPlan, mainCategory, category, subCategory, memo
      ]);

      const problemId = result.insertId;

      // 사진 데이터 삽입
      if (photos && photos.length > 0) {
        const photoValues = photos.map(photo => [
          problemId, photo.photoUrl, photo.photoType
        ]);

        await pool.query(sql.addPhotos, [photoValues]);
      }
    } catch (error) {
      throw new Error("문제 추가 실패");
    }
  },
  
};
