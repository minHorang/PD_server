import { status } from "../../config/response.status.js";
import { ChatService } from "./chat.service.js";
import { response } from "../../config/response.js";
import { setChatRoomResponseDTO, setChatMessageResponseDTO, errorResponseDTO } from './chat.response.dto.js'; // DTO 함수 import


export const getOrCreateChatRoom = async (req, res) => {
    const { problem_id, session_key } = req.body;
    try {
        const result = await ChatService.getOrCreateChatRoom(problem_id, session_key);
        res.send(response(status.SUCCESS, setChatRoomResponseDTO(result.roomId, result.logs)));
    } catch (error) {
        if (error.message === 'Bad Request') {
            return res.send(response(status.BAD_REQUEST, errorResponseDTO(error.message)));
        }
        return res.send(response(status.INTERNAL_SERVER_ERROR, errorResponseDTO(error.message)));
    }
};

export const addChatMessage = async (req, res) => {
    const { room_id, message, speaker } = req.body;
    try {
        const result = await ChatService.addChatMessage(room_id, message, speaker);
        res.send(response(status.SUCCESS, setChatMessageResponseDTO(result.chatId)));
    } catch (error) {
        if (error.message === 'Bad Request') {
            return res.send(response(status.BAD_REQUEST, errorResponseDTO(error.message)));
        }
        return res.send(response(status.INTERNAL_SERVER_ERROR, errorResponseDTO(error.message)));
    }
};