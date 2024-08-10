import { ProblemModel } from "./problem.model.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

export const ProblemService = {
  setScale: async (scale) => {
    // 스케일 설정
    return scale;
  },

  searchProblems: async (query, folderId) => {
    try {
      const problems = await ProblemModel.search(query, folderId);
      return problems;
    } catch (error) {
      throw new BaseError(status.BAD_REQUEST, "문제 검색 실패");
    }
  },

  getProblem: async (problemId) => {
    try {
      const problem = await ProblemModel.findById(problemId);
      if (!problem) {
        throw new BaseError(status.NOT_FOUND, "문제를 찾을 수 없습니다.");
      }
      return problem;
    } catch (error) {
      throw new BaseError(status.BAD_REQUEST, "문제 조회 실패");
    }
  },

  editProblem: async (problemId, problemData) => {
    try {
      await ProblemModel.update(problemId, problemData);
    } catch (error) {
      throw new BaseError(status.BAD_REQUEST, "문제 수정 실패");
    }
  },

  addProblem: async (problemData) => {
    try {
      await ProblemModel.create(problemData);
    } catch (error) {
      console.error("문제 추가 실패:", error);
      throw new BaseError(status.BAD_REQUEST, "문제 추가 실패");
    }
  },

  getMainTypes: async () => {
    try {
      const mainTypes = await ProblemModel.getMainTypes();
      return mainTypes;
    } catch (error) {
      throw new BaseError(status.BAD_REQUEST, "대분류 조회 실패");
    }
  },

  getMidTypes: async (parentTypeId) => {
    try {
      const midTypes = await ProblemModel.getMidTypes(parentTypeId);
      return midTypes;
    } catch (error) {
      throw new BaseError(status.BAD_REQUEST, "중분류 조회 실패");
    }
  },

  getSubTypes: async (parentTypeId) => {
    try {
      const subTypes = await ProblemModel.getSubTypes(parentTypeId);
      return subTypes;
    } catch (error) {
      throw new BaseError(status.BAD_REQUEST, "소분류 조회 실패");
    }
  }


};
