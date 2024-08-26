import { pool } from "../../config/db.js"; 
import { sql } from "./chat.sql.js"; 

export const ChatModel = {

  findChatRoom: async (problem_id, session_key) => {
    try {
      const [rows] = await pool.query(sql.findChatRoom, [problem_id, session_key]);

      return rows[0].room_id; // 채팅방이 없으면 undefined 반환
    } catch (error) {
      console.error("채팅방 조회 실패:", error.message);
      throw new Error("채팅방 조회 실패");
    }
  },

  createChatRoom: async (problem_id, session_key) => {
    try {
      const [result] = await pool.query(sql.createChatRoom, [problem_id, session_key]);
      return { room_id: result.insertId };
    } catch (error) {
      console.error("채팅방 생성 실패:", error.message);
      throw new Error("채팅방 생성 실패");
    }
  },

  getChatLogs: async (room_id) => {
    try {
      const [rows] = await pool.query(sql.getChatLogs, [room_id]);
      return rows;
    } catch (error) {
      console.error("채팅 로그 조회 실패:", error.message);
      throw new Error("채팅 로그 조회 실패");
    }
  },

  addChatMessage: async (room_id, message, speaker) => {
    try {
      const [seqResult] = await pool.query(sql.getNextSequence, [room_id]);
      const sequence = seqResult[0].nextSeq;

      const [result] = await pool.query(sql.addChatMessage, [room_id, message, speaker, sequence]);
      return { chat_id: result.insertId };
    } catch (error) {
      console.error("채팅 메시지 추가 실패:", error.message);
      throw new Error("채팅 메시지 추가 실패");
    }
  },

  getSessionKey: async (room_id) => {
    try {
      const [rows] = await pool.query(sql.getSessionKey, [room_id]);
      return rows[0] ? rows[0].session_key : null; // 세션 키가 없을 경우 null 반환
    } catch (error) {
      console.error("세션 키 조회 실패:", error.message);
      throw new Error("세션 키 조회 실패");
    }
  },
};
