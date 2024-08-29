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
  
// EDIT 관련

  updateProblem: async (problemId, problemText, answer, status, memo) => {
    try {
      await pool.query(sql.updateProblem, [problemText, answer, status, memo, problemId]);
    } catch (error) {
      console.error("문제 텍스트 및 정답 업데이트 실패:", error.message);
      throw new Error("문제 텍스트 및 정답 업데이트 실패");
    }
  },
  
  deleteProblemTypeAssignment: async (problemId) => {
    try {
      await pool.query(sql.deleteProblemTypeAssignment, [problemId]);
    } catch (error) {
      console.error("유형 할당 삭제 실패:", error.message);
      throw new Error("유형 할당 삭제 실패");
    }
  },

  addProblemTypeAssignment: async (problemId, typeId) => {
    try {
      await pool.query(sql.addProblemTypeAssignment, [problemId, typeId]);
    } catch (error) {
      console.error("유형 할당 추가 실패:", error.message);
      throw new Error("유형 할당 추가 실패");
    }
  },

  findProblemTypeIdByNameAndLevel: async (typeName, typeLevel) => {
    try {
      const [results] = await pool.query(sql.findProblemTypeIdByNameAndLevel, [typeName, typeLevel]);
      return results[0] ? results[0].type_id : null;
    } catch (error) {
      console.error("유형 ID 조회 실패:", error.message);
      throw new Error("유형 ID 조회 실패");
    }
  },

  // 문제와 관련된 기존 이미지 삭제
  deletePhotosByProblemId: async (problemId) => {
    try {
      await pool.query(sql.deletePhotosByProblemId, [problemId]);
    } catch (error) {
      console.error("기존 이미지 삭제 실패:", error.message);
      throw new Error("기존 이미지 삭제 실패");
    }
  },

  // 새 이미지 추가
  addPhoto: async (problemId, photoUrl, photoType) => {
    try {
      await pool.query(sql.addPhoto, [problemId, photoUrl, photoType]);
    } catch (error) {
      console.error("새 이미지 추가 실패:", error.message);
      throw new Error("새 이미지 추가 실패");
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
      folderId, userId, problemText, answer, status, orderValue, memo
    } = problemData;
  
    try {
      const [result] = await pool.query(sql.addProblem, [
        folderId, userId, problemText, answer, status, orderValue, memo
      ]);
  
      return { problemId: result.insertId }
    } catch (error) {
      console.error("문제 추가 실패:", error);
      throw new Error("문제 추가 실패");
    }
  },

  addPhotos: async (problemId, photos) => {
    try {
      const photoData = photos.map(({ photoUrl, photoType }) => [problemId, photoUrl, photoType]);
  
      if (photoData.length > 0) {
        await pool.query(sql.addPhotos, [photoData]);
      }
    } catch (error) {
      console.error("문제 추가하기에서 사진 추가 실패:", error);
      throw new Error("문제 추가하기에서 사진 추가 실패");
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
      const [result] = await pool.query(sql.addProblemType, [typeName, parentTypeId, typeLevel, userId]);
      const typeId = result.insertId;
      return { typeId, typeName };
    } catch (error) {
      console.error("문제 유형 추가 실패:", error.message);
      throw new Error("문제 유형 추가 실패");
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
