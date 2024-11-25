import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { PortfolioService } from "./portfolio.service.js";
import { getListResponseDTO } from "./portfolio.response.js";

export const getPortfolio = async (req, res) => {
  try {
    const category = req.params.category;

    const portfoliio = await PortfolioService.getList(category);
    if (portfoliio) {
      console.log(portfoliio);
      console.log("contoller");

      res.send(response(status.SUCCESS, getListResponseDTO(portfoliio)));
    } else {
      res.send(
        response(
          status.NOT_FOUND,
          errorResponseDTO("유저정보를 찾을 수 없습니다.")
        )
      );
    }
  } catch (error) {}
};
