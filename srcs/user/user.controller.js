import { status } from "../../config/response.status.js";
import { response } from "../../config/response.js";
import { UserService } from "./user.service.js";
import { errorResponseDTO, getInfoResponseDTO } from "./user.response.dto.js";

export const getInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const userInfo = await UserService.getInfo(userId);
    if (userInfo) {
      res.send(response(status.SUCCESS, getInfoResponseDTO(userInfo)));
    } else {
      res.send(
        response(
          status.NOT_FOUND,
          errorResponseDTO("데이터를 찾을 수 없습니다.")
        )
      );
    }
  } catch (error) {
    res.send(
      response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문"))
    );
  }
};
