import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { PortfolioService } from "./portfolio.service.js";
import {
  errorResponseDTO,
  getListResponseDTO,
  postSuggestResponseDTO,
} from "./portfolio.response.js";

export const getPortfolio = async (req, res) => {
  try {
    const category = req.query.category;

    const portfoliio = await PortfolioService.getList(category);
    if (portfoliio) {
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

export const getPortfolioDetail = async (req, res) => {
  try {
    const id = req.query.portfolio_id;

    const portfoliio = await PortfolioService.getDetail(id);
    if (portfoliio) {
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

export const getMyWrite = async (req, res) => {
  try {
    const id = req.query.id;

    const title = await PortfolioService.getWrite(id);
    if (title) {
      res.send(response(status.SUCCESS, getListResponseDTO(title)));
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

export const postSuggestTeam = async (req, res) => {
  try {
    const body = req.body;
    await PortfolioService.postSuggest(body);
    res.send(response(status.SUCCESS, postSuggestResponseDTO("제안 성공")));
  } catch (error) {
    res.send(response(status.BAD_REQUEST, errorResponseDTO("Invalid request")));
  }
};

export const postPortfolio = async (req, res) => {
  try {
    console.log(req.body);
    const body = req.body;
    await PortfolioService.postPortfolio(body);

    res.send(
      response(status.SUCCESS, postSuggestResponseDTO("포트폴리오 작성 성공"))
    );
  } catch (error) {
    res.send(response(status.BAD_REQUEST, errorResponseDTO("Invalid request")));
  }
};
