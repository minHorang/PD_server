import { ProblemModel } from "./problem.model.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

export const ProblemService = {
  setScale: async (scale) => {
    return scale;
  },

  searchProblems: async (query, folderId, userId) => {
    const isSubscribed = await ProblemModel.checkSubscriptionStatus(userId);
    if (!isSubscribed) {
      throw new Error("구독 계정만 이용 가능합니다.");
    }
    if (folderId) {
      return await ProblemModel.searchByFolder(query, folderId);
    } else {
      return await ProblemModel.searchAll(query);
    }
  },


  getProblem: async (problemId) => {
    try {
      const problem = await ProblemModel.findById(problemId);
      if (!problem) return null;

      const photos = await ProblemModel.findPhotosByProblemId(problemId);
      const types = await ProblemModel.findTypesByProblemId(problemId);

      // photo_type 별로 그룹화
      const groupedPhotos = photos.reduce((acc, photo) => {
        if (!acc[photo.photo_type]) {
          acc[photo.photo_type] = [];
        }
        acc[photo.photo_type].push(photo.photo_url);
        return acc;
      }, {});
      
      return {
        ...problem,
        photos: groupedPhotos,
        types
      };
    } catch (error) {
      throw new Error("문제 조회 실패");
    }
  },

  // EDIT 관련
  updateProblemTextAndAnswer: async (problemId, problemText, answerText) => {
    await ProblemModel.updateProblem(problemId, problemText, answerText);
  },

  updateProblemTypes: async (problemId, typeIds) => {
    // 기존 유형 할당 삭제
    await ProblemModel.deleteProblemTypeAssignment(problemId);

    // 새로운 유형 할당 추가
    for (let typeId of typeIds) {
      if (typeId) {
        await ProblemModel.addProblemTypeAssignment(problemId, typeId);
      }
    }
  },

  updateProblemPhotos: async (problemId, photos) => {
    // 기존 이미지 삭제
    await ProblemModel.deletePhotosByProblemId(problemId);
    // 새 이미지 저장
    for (let { url, type } of photos) {
      await ProblemModel.addPhoto(problemId, url, type);
    }
  },

  addProblem: async (problemData, userId) => {
    try {
      const {
        folderId,
        problemText,
        answer,
        status,
        memo,
        mainTypeId,
        midTypeId,
        subTypeIds,
        photos
      } = problemData;
      const problemMaxOrderValue = await ProblemModel.getProblemMaxOrderValue(userId, folderId);
      const newProblemOrderValue = problemMaxOrderValue + 1;
  
      const newProblem = await ProblemModel.create({
        folderId,
        userId,
        problemText,
        answer,
        status,
        orderValue: newProblemOrderValue,
        memo
      });
  
      if (mainTypeId) {
        await ProblemModel.addProblemTypeAssignment(newProblem.problemId, mainTypeId);
      }
  
      if (midTypeId) {
        await ProblemModel.addProblemTypeAssignment(newProblem.problemId, midTypeId);
      }
  
      if (subTypeIds && Array.isArray(subTypeIds)) {
        for (const subTypeId of subTypeIds) {
          await ProblemModel.addProblemTypeAssignment(newProblem.problemId, subTypeId);
        }
      }
  
      // 문제 사진 추가
      if (photos && photos.length > 0) {
        await ProblemModel.addPhotos(newProblem.problemId, photos);
      }
  
      return newProblem;
    } catch (error) {
      console.error("문제 추가 실패:", error);
      throw new BaseError(status.BAD_REQUEST, "문제 추가 실패");
    }
  },

  getMainTypes: async (userId) => {
    try {
      const mainTypes = await ProblemModel.getMainTypes(userId);
      return mainTypes;
    } catch (error) {
      throw new BaseError(status.BAD_REQUEST, "대분류 조회 실패");
    }
  },

  getMidTypes: async (parentTypeId, userId) => {
    try {
      const midTypes = await ProblemModel.getMidTypes(parentTypeId, userId);
      return midTypes;
    } catch (error) {
      throw new BaseError(status.BAD_REQUEST, "중분류 조회 실패");
    }
  },

  getSubTypes: async (parentTypeId, userId) => {
    try {
      const subTypes = await ProblemModel.getSubTypes(parentTypeId, userId);
      return subTypes;
    } catch (error) {
      throw new BaseError(status.BAD_REQUEST, "소분류 조회 실패");
    }
  },

  addProblemType: async (typeName, parentTypeId, typeLevel, userId) => {
    try {
      await ProblemModel.addProblemType(typeName, parentTypeId, typeLevel, userId);
    } catch (error) {
      if (typeLevel === 1) {
        throw new BaseError(status.BAD_REQUEST, "대분류 추가 실패");
      } else if (typeLevel === 2) {
        throw new BaseError(status.BAD_REQUEST, "중분류 추가 실패");
      } else if (typeLevel === 3) {
        throw new BaseError(status.BAD_REQUEST, "소분류 추가 실패");
      }
    }
  },

  deleteProblem: async (problemId, userId) => {
    try {
      const deleted = await ProblemModel.delete(problemId, userId);
      return deleted;
    } catch (error) {
      throw new BaseError(status.BAD_REQUEST, "문제 삭제 실패");
    }
  },

  deleteMainType: async (typeId, userId) => {
    try {
      console.log('Service - deleteMainType:', { typeId, userId });
  
      // 1. 대분류에 연결된 중분류 찾기
      const midTypes = await ProblemModel.getMidTypesByMainType(typeId, userId);
      
      // 2. 각 중분류에 연결된 소분류 삭제
      for (const midType of midTypes) {
        await ProblemModel.deleteSubTypesByMidType(midType.type_id, userId);
      }
      
      // 3. 대분류에 연결된 중분류 삭제
      await ProblemModel.deleteMidTypesByMainType(typeId, userId);
      
      // 4. 대분류 삭제
      await ProblemModel.deleteMainType(typeId, userId);
  
    } catch (error) {
      console.error('대분류 삭제 실패:', error.message);
      throw new BaseError(status.BAD_REQUEST, "대분류 삭제 실패");
    }
  },  

  deleteSubTypesByMidType: async (midTypeId, userId) => {
    try {
      console.log('Service - deleteSubTypesByMidType:', { midTypeId, userId });

      await ProblemModel.deleteSubTypesByMidType(midTypeId, userId);
    } catch (error) {
      console.error('중분류에 연관된 소분류 삭제 실패:', error.message);
      throw new BaseError(status.BAD_REQUEST, "중분류에 연관된 소분류 삭제 실패");
    }
  },

  deleteMidType: async (typeId, userId) => {
    try {
      console.log('Service - deleteMidType:', { typeId, userId });

      await ProblemModel.deleteMidType(typeId, userId);
    } catch (error) {
      console.error('중분류 삭제 실패:', error.message);
      throw new BaseError(status.BAD_REQUEST, "중분류 삭제 실패");
    }
  },

  deleteSubType: async (typeId, userId) => {
    try {
      console.log('Service - deleteSubType:', { typeId, userId });

      await ProblemModel.deleteSubType(typeId, userId);
    } catch (error) {
      console.error('소분류 삭제 실패:', error.message);
      throw new BaseError(status.BAD_REQUEST, "소분류 삭제 실패");
    }
  },

  getStatisticIncorrectProblem: async (userId) => {
    try{
      
      return await ProblemModel.getIncorrectProblemStatistic(userId);
    } catch (error) {
      throw new BaseError(status.INTERNAL_SERVER_ERROR,"틀린 문제 통계 조회 실패")
    }
  },

  getStatisticIncorrectType: async (userId) => {
    try{
      
      return await ProblemModel.getIncorrectTypeStatistic(userId);

    } catch (error) {
      throw new BaseError(status.INTERNAL_SERVER_ERROR,"틀린 문제 유형 통계 조회 실패");
    }

  },

  getStatisticIncorrectRatio: async (userId) => {
    try{
      
      return await ProblemModel.getIncorrectRatioStatistic(userId);

    } catch (error) {
      throw new BaseError(status.INTERNAL_SERVER_ERROR,"틀린 문제 비율 통계 조회 실패");
    }

  },


};
