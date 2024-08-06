import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { UserModel } from "./user.model.js";

export const UserService = {
  getInfo: async (userId) => {
    try {
      const userInfo = await UserModel.findById(userId);
      if (!userInfo) {
        throw new BaseError(status.NOT_FOUND, "회원을 찾을 수 없습니다.");
      }
      return userInfo;
    } catch (error) {
      throw new BaseError(status.BAD_REQUEST, "회원 조회 실패");
    }
  },

  editNickname: async (userId, nicknameData) => {
    try {
      await UserModel.updateNickname(userId, nicknameData);
    } catch (error) {
      throw new BaseError(status.BAD_REQUEST, "문제 수정 실패");
    }
  },

  inactiveUser: async (userId) => {
    try {
      await UserModel.patchStatus(userId);
    } catch (error) {
      throw new BaseError(status.BAD_REQUEST, "회원 비활성화 실패");
    }
  },
};
