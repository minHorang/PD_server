import { SearchModel } from "./search.model.js";
import { BaseError } from "../../../config/error.js";
import { status } from "../../../config/response.status.js";

export const SearchService = {
    
  searchProblems: async (query, folderId, userId) => {
    const isSubscribed = await SearchModel.checkSubscriptionStatus(userId);
    if (!isSubscribed) {
      throw new Error("구독 계정만 이용 가능합니다.");
    }
    if (folderId) {
      return await SearchModel.searchByFolder(query, folderId);
    } else {
      return await SearchModel.searchAll(query);
    }
  },


  getProblem: async (problemId) => {
    try {
      const problem = await SearchModel.findById(problemId);
      if (!problem) return null;

      const photos = await SearchModel.findPhotosByProblemId(problemId);
      const types = await SearchModel.findTypesByProblemId(problemId);

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
};
