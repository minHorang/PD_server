import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { PortfolioModel } from "./portfolio.model.js";

export const PortfolioService = {
  getList: async (category) => {
    try {
      const portfoliio = await PortfolioModel.findByCateogory(category);
      if (!portfoliio) {
        throw new BaseError(
          status.NOT_FOUND,
          "포트폴리오 목록을 찾을 수 없습니다."
        );
      }
      console.log(portfoliio);
      return portfoliio;
    } catch (error) {
      console.error("portfolio Error:", error);
      throw new BaseError(status.BAD_REQUEST, "포트폴리오 조회 실패");
    }
  },
  getDetail: async (id) => {
    try {
      const detail = await PortfolioModel.findById(id);
      if (!detail) {
        throw new BaseError(status.NOT_FOUND, "포트폴리오를 찾을 수 없습니다.");
      }
      console.log(detail);
      return detail;
    } catch (error) {
      console.error("portfolio Error:", error);
      throw new BaseError(status.BAD_REQUEST, "포트폴리오 조회 실패");
    }
  },
  getWrite: async (id) => {
    try {
      const title = await PortfolioModel.findByUser(id);
      if (!title) {
        throw new BaseError(status.NOT_FOUND, "포트폴리오를 찾을 수 없습니다.");
      }
      console.log(title);
      return title;
    } catch (error) {
      console.error("portfolio Error:", error);
      throw new BaseError(status.BAD_REQUEST, "포트폴리오 조회 실패");
    }
  },

  postSuggest: async (body) => {
    try {
      await PortfolioModel.postSuggest(body);
    } catch (error) {
      console.error("portfolio Error:", error);
      throw new BaseError(status.BAD_REQUEST, "팀 제안 실패");
    }
  },
  postPortfolio: async (body) => {
    try {
      await PortfolioModel.postPortfolio(body);
    } catch (error) {
      console.error("portfolio Error:", error);
      throw new BaseError(status.BAD_REQUEST, "포트폴리오 작성 실패");
    }
  },
};
