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
    try {
      const {
        folderId, folderName, subscriptionPlan, problemText, answer,
        mainCategory, category, subCategory, problemImage,
        solutionImage, passageImage, additionalProblemImage
      } = problemData;

      await pool.query(sql.addProblem, [
        folderId, folderName, subscriptionPlan, problemText, answer,
        mainCategory, category, subCategory, problemImage,
        solutionImage, passageImage, additionalProblemImage
      ]);
    } catch (error) {
      console.error("문제 추가 실패: ", error);
      throw new Error("문제 추가 실패");
    }
  },
  
};
