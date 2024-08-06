import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { UserService } from "./user.service.js";
import {
  errorResponseDTO,
  getInfoResponseDTO,
  patchUserStatusrResponseDTO,
} from "./user.response.dto.js";

export const getInfo = async (req, res) => {
  try {
    //userID에 토큰 값 해석한 실제 값 넣어야함.
    const userId = 1;
    const userInfo = await UserService.getInfo(userId);
    if (userInfo) {
      res.send(response(status.SUCCESS, getInfoResponseDTO(userInfo)));
    } else {
      res.send(
        response(
          status.NOT_FOUND,
          errorResponseDTO("유저정보를 찾을 수 없습니다.")
        )
      );
    }
  } catch (error) {
    res.send(response(status.BAD_REQUEST, errorResponseDTO("Invalid request")));
  }
};

export const patchNickname = async (req, res) => {
  try {
    const userId = 1;
    const nicknameData = req.body.newNickname;
    await UserService.editNickname(userId, nicknameData);
    res.send(
      response(status.SUCCESS, patchNicknameResponseDTO("닉네임 변경 성공"))
    );
  } catch (error) {
    res.send(response(status.BAD_REQUEST, errorResponseDTO("Invalid request")));
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = 1;
    await UserService.inactiveUser(userId);
    res.semd(
      response(status.SUCCESS, patchUserStatusrResponseDTO("비활성화 성공"))
    );
  } catch (error) {
    res.send(response(status.BAD_REQUEST, errorResponseDTO("Invalid request")));
  }
};

export const userLogout = async (req, res) => {
  try {
  } catch (error) {
    res.send(response(status.BAD_REQUEST, errorResponseDTO("Invalid request")));
  }
};
