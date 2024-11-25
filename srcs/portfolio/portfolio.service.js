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
};