import { status } from "../../config/response.status.js";
import { ProblemService } from "./problem.service.js";
import { response } from "../../config/response.js";
import { 
  setScaleResponseDTO, 
  searchProblemsResponseDTO, 
  getProblemResponseDTO, 
  editProblemResponseDTO, 
  errorResponseDTO,
  addProblemResponseDTO, 
} from "./problem.reponse.dto.js";

export const setScale = async (req, res) => {
  try {
    const { scale } = req.query;
    const result = await ProblemService.setScale(parseFloat(scale));
    res.send(response(status.SUCCESS, setScaleResponseDTO(result)));
  } catch (error) {
    res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
  }
};

export const searchProblems = async (req, res) => {
  try {
    const { query, folderId } = req.query;
    const problems = await ProblemService.searchProblems(query, folderId);
    res.send(response(status.SUCCESS, searchProblemsResponseDTO(problems)));
  } catch (error) {
    res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
  }
};

export const getProblem = async (req, res) => {
  try {
    const { problemId } = req.params;
    const problem = await ProblemService.getProblem(problemId);
    if (problem) {
      res.send(response(status.SUCCESS, getProblemResponseDTO(problem)));
    } else {
      res.send(response(status.NOT_FOUND, errorResponseDTO("데이터를 찾을 수 없습니다.")));
    }
  } catch (error) {
    res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
  }
};

export const editProblem = async (req, res) => {
  try {
    const { problemId } = req.params;
    const problemData = req.body;
    await ProblemService.editProblem(problemId, problemData);
    res.send(response(status.SUCCESS, editProblemResponseDTO("문제 수정 성공")));
  } catch (error) {
    res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
  }
};

// 문제 등록
export const addProblem = async (req, res) => {
  try {
    const problemData = req.body;
    await ProblemService.addProblem(problemData);
    res.send(response(status.SUCCESS, addProblemResponseDTO("문제 등록 성공")));
  } catch (error) {
    res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
  }
};