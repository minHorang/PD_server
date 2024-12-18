import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { TeamModel } from "./team.model.js";

export const TeamService = {
  getList: async (category) => {
    try {
      const teamList = await TeamModel.findTeamByCategory(category);
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
      const teamDetail = await TeamModel.findTeamById(id);
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
      await TeamModel.postSuggest(body);
    } catch (error) {
      console.error("Team Error:", error);
      throw new BaseError(status.BAD_REQUEST, "팀 제안 실패");
    }
  },

  postProject: async (body) => {
    try {
      await TeamModel.postProject(body);
    } catch (error) {
      console.error("portfolio Error:", error);
      throw new BaseError(status.BAD_REQUEST, "프로젝트 작성 실패");
    }
  },
  getMypageInfo: async (id) => {
    try {
      const Mypage = await TeamModel.getMypageInfo(id);
      if (!Mypage) {
        throw new BaseError(status.NOT_FOUND, "팀 정보를 찾을 수 없습니다.");
      }
      return Mypage;
    } catch (error) {
      console.error("Team Error:", error);
      throw new BaseError(status.BAD_REQUEST, "팀 조회 실패");
    }
  },
};
