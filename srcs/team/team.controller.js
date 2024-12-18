import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import {
  errorResponseDTO,
  getListResponseDTO,
  mypageResponseDTO,
  postSuggestResponseDTO,
} from "./team.response.dto.js";
import { TeamService } from "./team.service.js";

export const getTeam = async (req, res) => {
  try {
    const category = req.query.category;

    const teamList = await TeamService.getList(category);
    if (teamList) {
      res.send(response(status.SUCCESS, getListResponseDTO(teamList)));
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

export const getTeamDetail = async (req, res) => {
  try {
    const id = req.query.id;

    const teamDetail = await TeamService.getDetail(id);
    if (teamDetail) {
      res.send(response(status.SUCCESS, getListResponseDTO(teamDetail)));
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
    console.log(req.body);
    const body = req.body;
    await TeamService.postSuggest(body);
    res.send(response(status.SUCCESS, postSuggestResponseDTO("제안 성공")));
  } catch (error) {
    res.send(response(status.BAD_REQUEST, errorResponseDTO("Invalid request")));
  }
};

export const postProject = async (req, res) => {
  try {
    const body = req.body;
    await TeamService.postProject(body);
    res.send(
      response(status.SUCCESS, postSuggestResponseDTO("프로젝트 작성 성공"))
    );
  } catch (error) {
    res.send(response(status.BAD_REQUEST, errorResponseDTO("Invalid request")));
  }
};

export const getMypage = async (req, res) => {
  try {
    const id = req.query.id;

    const Mypage = await TeamService.getMypageInfo(id);
    if (Mypage) {
      res.send(response(status.SUCCESS, mypageResponseDTO(Mypage)));
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
