import { status } from "../../../config/response.status.js";
import { SearchService } from "./search.service.js";
import { ChatService } from "../../chat/chat.service.js";
import { response } from "../../../config/response.js";
import { 
    getProblemListResponseDTO, 
    getProblemResponseDTO, 
    errorResponseDTO,
  } from "./search.response.dto.js";

export const searchProblems = async (req, res) => {
    try {
      const { query, folderId } = req.query;
      const userId = req.userId;
      const problems = await SearchService.searchProblems(query, folderId, userId);
      res.send(response(status.SUCCESS, getProblemListResponseDTO(problems)));
    } catch (error) {
      if (error.message === "구독 계정만 이용 가능합니다.") {
        res.status(403).send(response(status.FORBIDDEN, errorResponseDTO(error.message)));
      } else {
        console.log(error);
        res.status(400).send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
      }
    }
  };
  
  
  export const getProblem = async (req, res) => {
    try {
      const { problemId } = req.params;
      const problem = await SearchService.getProblem(problemId);
      if (problem) {
        const sessionKey = await ChatService.getSessionKey(problemId);
        res.send(response(status.SUCCESS, getProblemResponseDTO(problem, sessionKey)));
      } else {
        res.send(response(status.NOT_FOUND, errorResponseDTO("데이터를 찾을 수 없습니다.")));
      }
    } catch (error) {
      res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
    }
  };