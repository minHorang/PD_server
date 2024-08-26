import { ChatModel } from "./chat.model.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

export const ChatService = {

  getOrCreateChatRoom: async (problem_id, session_key) => {
    try {
      // 채팅방 조회
      let room_id = await ChatModel.findChatRoom(problem_id, session_key);

      // 채팅방이 없으면 생성
      if (!room_id) {
        room_id = await ChatModel.createChatRoom(problem_id, session_key);
      }
      // 채팅방의 채팅 로그 조회
      const logs = await ChatModel.getChatLogs(room_id);
      return { roomId: room_id, logs };
    } catch (error) {
      console.error("채팅방 조회 또는 생성 실패:", error.message);
      throw new BaseError("채팅방 조회 또는 생성 실패", status.SERVER_ERROR);
    }
  },

  addChatMessage: async (room_id, message, speaker) => {
    try {
      // 채팅 메시지 추가
      const chatLog = await ChatModel.addChatMessage(room_id, message, speaker);
      return { chatId: chatLog.chat_id };
    } catch (error) {
      console.error("채팅 메시지 추가 실패:", error.message);
      throw new BaseError("채팅 메시지 추가 실패", status.SERVER_ERROR);
    }
  },

  getSessionKey: async (room_id) => {
    try {
      const sessionKey = await ChatModel.getSessionKey(room_id);
      return sessionKey;
    } catch (error) {
      console.error("세션 키 반환 실패:", error.message);
      throw new BaseError("세션 키 반환 실패", status.SERVER_ERROR);
    }
  },
};
