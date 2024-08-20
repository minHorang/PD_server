import { pool } from "../../config/db.js"; 
import { sql } from "./problem.sql.js"; 

export const ProblemModel = {

  searchAll: async (query) => {
    try {
      console.log("searchAll");
      const [results] = await pool.query(sql.searchProblem, [`%${query}%`]);
      return results;
    } catch (error) {
      console.error("문제 검색 실패:", error.message);
      throw new Error("문제 검색 실패");
    }
  },

  searchByFolder: async (query, folderId) => {
    try {
      const [results] = await pool.query(sql.searchProblemByFolder, [`%${query}%`, folderId]);
      return results;
    } catch (error) {
      console.error("문제 검색 실패:", error.message);
      throw new Error("문제 검색 실패");
    }
  },

  checkSubscriptionStatus: async (userId) => {
    try {
      const [results] = await pool.query(sql.checkSubscriptionStatus, [userId]);
      return results.length > 0;
    } catch (error) {
      console.error("구독 상태 확인 실패:", error.message);
      throw new Error("구독 상태 확인 실패");
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
  },

  getProblemMaxOrderValue: async (userId, folderId) => {
    try {
      const [results] = await pool.query(sql.getProblemMaxOrderValue, [userId, folderId]);
      console.log('Max Order Value Query Result:', results);
      return results[0].maxProblemOrderValue || 0;
    } catch (error) {
      console.error("최대 order_value 조회 실패:", error);
      throw new Error("최대 orderValue 조회 실패");
    }
  },

  create: async (problemData) => {
    const {
      folderId, userId, problemText, answer, status, orderValue, photos, memo,
      mainTypeId, midTypeId, subTypeIds
    } = problemData;

    try {
      console.log('Model userId:', userId);
      const [result] = await pool.query(sql.addProblem, [
        folderId, userId, problemText, answer, status, orderValue, memo
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
      console.error("문제 추가 실패:", error);
      throw new Error("문제 추가 실패");
    }
  },

  getIncorrectProblemStatistic: async (userId) => {
    try{
      const [result] = await pool.query(sql.getIncorrectProblemStatistic, [userId]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getIncorrectTypeStatistic: async (userId) => {
    try{
      const [result] = await pool.query(sql.getIncorrectTypeStatistic, [userId]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  getIncorrectRatioStatistic: async (userId) => {
    try{
      const [result] = await pool.query(sql.getIncorrectRatioStatistic, [userId,userId]);
      
      return result;
    } catch (error) {
      throw error;
    }
  },
  

  getMainTypes: async (userId) => {
    try {
      const [results] = await pool.query(sql.getMainTypes, [userId]);
      return results;
    } catch (error) {
      throw new Error("대분류 조회 실패");
    }
  },

  getMidTypes: async (parentTypeId, userId) => {
    try {
      const [results] = await pool.query(sql.getMidTypes, [parentTypeId, userId]);
      return results;
    } catch (error) {
      throw new Error("중분류 조회 실패");
    }
  },

  getSubTypes: async (parentTypeId, userId) => {
    try {
      const [results] = await pool.query(sql.getSubTypes, [parentTypeId, userId]);
      return results;
    } catch (error) {
      throw new Error("소분류 조회 실패");
    }
  },

  addProblemType: async (typeName, parentTypeId, typeLevel, userId) => {
    try {
      if (typeLevel === 1) {
        await pool.query(sql.addProblemType, [typeName, null, typeLevel, userId]);
      } else if (typeLevel === 2) {
        await pool.query(sql.addProblemType, [typeName, parentTypeId, typeLevel, userId]);
      } else if (typeLevel === 3) {
        await pool.query(sql.addProblemType, [typeName, parentTypeId, typeLevel, userId]);
      }
    } catch (error) {
      throw new Error(`문제 유형 추가 실패`);
    }
  },

  delete: async (problemId, userId) => {
    try {
      console.log("Deleting problem with ID:", problemId, "for user:", userId);
      const [result] = await pool.query(sql.deleteProblem, [problemId, userId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("문제 삭제 실패");
    }
  },

  getMidTypesByMainType: async (typeId, userId) => {
    try {
      console.log('Model - getMidTypesByMainType:', { typeId, userId });
      const [results] = await pool.query(sql.getMidTypesByMainType, [typeId, userId]);
      return results;
    } catch (error) {
      console.error('대분류에 연관된 중분류 조회 실패:', error.message);
      throw new Error("대분류에 연관된 중분류 조회 실패");
    }
  },

  deleteSubTypesByMidType: async (midTypeId, userId) => {
    try {
      console.log('Model - deleteSubTypesByMidType:', { midTypeId, userId });
      await pool.query(sql.deleteSubTypesByMidType, [midTypeId, userId]);
    } catch (error) {
      console.error('중분류에 연관된 소분류 삭제 실패:', error.message);
      throw new Error("중분류에 연관된 소분류 삭제 실패");
    }
  },

  deleteMidTypesByMainType: async (typeId, userId) => {
    try {
      console.log('Model - deleteMidTypesByMainType:', { typeId, userId });
      await pool.query(sql.deleteMidTypesByMainType, [typeId, userId]);
    } catch (error) {
      console.error('대분류에 연관된 중분류 삭제 실패:', error.message);
      throw new Error("대분류에 연관된 중분류 삭제 실패");
    }
  },

  deleteMainType: async (typeId, userId) => {
    try {
      console.log('Model - deleteMainType:', { typeId, userId });
      await pool.query(sql.deleteMainType, [typeId, userId]);
    } catch (error) {
      console.error('대분류 삭제 실패:', error.message);
      throw new Error("대분류 삭제 실패");
    }
  },

  deleteMidType: async (typeId, userId) => {
    try {
      console.log('Model - deleteMidType:', { typeId, userId });
      await pool.query(sql.deleteMidType, [typeId, userId]);
    } catch (error) {
      console.error('중분류 삭제 실패:', error.message);
      throw new Error("중분류 삭제 실패");
    }
  },

  deleteSubType: async (typeId, userId) => {
    try {
      console.log('Model - deleteSubType:', { typeId, userId });
      await pool.query(sql.deleteSubType, [typeId, userId]);
    } catch (error) {
      console.error('소분류 삭제 실패:', error.message);
      throw new Error("소분류 삭제 실패");
    }
  },
};
