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
      correctCount, incorrectCount, orderValue, photos, memo,
      mainTypeId, midTypeId, subTypeIds
    } = problemData;

    try {
      const [result] = await pool.query(sql.addProblem, [
        folderId, userId, problemText, answer, status,
        correctCount, incorrectCount, orderValue, memo
      ]);

      const problemId = result.insertId;

      if (mainTypeId) {
        await pool.query(sql.addProblemTypeAssignment, [problemId, mainTypeId]);
      }
  
      if (midTypeId) {
        await pool.query(sql.addProblemTypeAssignment, [problemId, midTypeId]);
      }
  
      if (subTypeIds) {
        if (Array.isArray(subTypeIds)) {
          if (subTypeIds.length > 0) {
            const subtypeAssignments = subTypeIds.map(subTypeId => [problemId, subTypeId]);
            await pool.query(sql.addProblemTypeAssignments, [subtypeAssignments]);
          }
        } else {
          await pool.query(sql.addProblemTypeAssignment, [problemId, subTypeIds]);
        }
      }

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

  getMainTypes: async () => {
    try {
      const [results] = await pool.query(sql.getMainTypes);
      return results;
    } catch (error) {
      throw new Error("대분류 조회 실패");
    }
  },

  getMidTypes: async (parentTypeId) => {
    try {
      const [results] = await pool.query(sql.getMidTypes, [parentTypeId]);
      return results;
    } catch (error) {
      throw new Error("중분류 조회 실패");
    }
  },

  getSubTypes: async (parentTypeId) => {
    try {
      const [results] = await pool.query(sql.getSubTypes, [parentTypeId]);
      return results;
    } catch (error) {
      throw new Error("소분류 조회 실패");
    }
  },

  addMainType: async (typeName) => {
    try {
      await pool.query(sql.addMainType, [typeName]);
    } catch (error) {
      throw new Error("대분류 추가 실패");
    }
  },

  addMidType: async (typeName, parentTypeId) => {
    try {
      await pool.query(sql.addMidType, [typeName, parentTypeId]);
    } catch (error) {
      throw new Error("중분류 추가 실패");
    }
  },

  addSubType: async (typeName, parentTypeId) => {
    try {
      await pool.query(sql.addSubType, [typeName, parentTypeId]);
    } catch (error) {
      throw new Error("소분류 추가 실패");
    }
  },
  
};
