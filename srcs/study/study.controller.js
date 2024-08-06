import { StudyService } from './study.service.js';
import { response } from '../../config/response.js';
import { status } from '../../config/response.status.js';
import { getFolderResponseDTO, errorResponseDTO, getProblemResponseDTO, checkAnswerResponseDTO, getProgressResponseDTO } from './study.dto.js';

export const selectFolder = async (req, res) => {
    try {
      const { folderId } = req.params;
      const userId = 1; // 더미 데이터
      const folder = await StudyService.selectFolder(folderId, userId);
      res.send(response(status.SUCCESS, getFolderResponseDTO(folder)));
    } catch (error) {
      if (error.message === "데이터를 찾을 수 없습니다.") {
        res.status(404).send(response(status.NOT_FOUND, errorResponseDTO(error.message)));
      } else {
        res.status(400).send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문입니다.")));
      }
    }
  };

export const getProblemByFolderAndIndex = async (req, res) => {
    try {
      const { folderId, problemIndex } = req.params;
      const userId = 1; // 더미 데이터
      const problem = await StudyService.getProblemByFolderAndIndex(folderId, parseInt(problemIndex, 10), userId);
      res.send(response(status.SUCCESS, getProblemResponseDTO(problem)));
    } catch (error) {
      if (error.message === "데이터를 찾을 수 없습니다.") {
        res.status(404).send(response(status.NOT_FOUND, errorResponseDTO(error.message)));
      } else {
        res.status(400).send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문입니다.")));
      }
    }
};


export const checkAnswer = async (req, res) => {
  try {
    const { folderId, problemId } = req.params;
    const { swipeDirection } = req.query;
    const userId = 1; // 더미 데이터
    const result = await StudyService.checkAnswer(folderId, problemId, swipeDirection, userId);
    res.send(response(status.SUCCESS, checkAnswerResponseDTO(result)));
  } catch (error) {
    if (error.message === "데이터를 찾을 수 없습니다.") {
      res.status(404).send(response(status.NOT_FOUND, errorResponseDTO(error.message)));
    } else if (error.message === "잘못된 요청 본문입니다.") {
      res.status(400).send(response(status.BAD_REQUEST, errorResponseDTO(error.message)));
    } else {
      res.status(500).send(response(status.INTERNAL_SERVER_ERROR, errorResponseDTO("서버 오류 발생")));
    }
  }
};



export const getProgress = async (req, res) => {
  try {
    const { folderId } = req.params;
    const userId = 1; // 더미 데이터
    const progress = await StudyService.getProgressByFolder(folderId, userId);
    res.send(response(status.SUCCESS, getProgressResponseDTO(progress)));
  } catch (error) {
    if (error.message === "데이터를 찾을 수 없습니다.") {
      res.status(404).send(response(status.NOT_FOUND, errorResponseDTO(error.message)));
    } else {
      res.status(500).send(response(status.INTERNAL_SERVER_ERROR, errorResponseDTO("서버 오류 발생")));
    }
  }
};