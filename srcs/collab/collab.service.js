import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { CollabModel } from "./collab.model.js";

export const CollabService = {
  getList: async (category) => {
    try {
      const teamList = await CollabModel.findCollabByCategory(category);
      if (!teamList) {
        throw new BaseError(status.NOT_FOUND, "팀 목록을 찾을 수 없습니다.");
      }
      return teamList;
    } catch (error) {
      console.error("Team Error:", error);
      throw new BaseError(status.BAD_REQUEST, "팀 조회 실패");
    }
  },

  getDetail: async (id) => {
    try {
      const teamDetail = await CollabModel.findCollabById(id);
      if (!teamDetail) {
        throw new BaseError(status.NOT_FOUND, "팀 정보를 찾을 수 없습니다.");
      }
      return teamDetail;
    } catch (error) {
      console.error("Team Error:", error);
      throw new BaseError(status.BAD_REQUEST, "팀 조회 실패");
    }
  },

  postSuggest: async (body) => {
    try {
      await CollabModel.postSuggest(body);
    } catch (error) {
      console.error("Team Error:", error);
      throw new BaseError(status.BAD_REQUEST, "팀 제안 실패");
    }
  },

  postProject: async (body) => {
    try {
      await CollabModel.postProject(body);
    } catch (error) {
      console.error("portfolio Error:", error);
      throw new BaseError(status.BAD_REQUEST, "프로젝트 작성 실패");
    }
  },
};
