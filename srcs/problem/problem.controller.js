import { status } from "../../config/response.status.js";
import { ProblemService } from "./problem.service.js";
import { response } from "../../config/response.js";
import { 
  setScaleResponseDTO, 
  getProblemListResponseDTO, 
  getProblemResponseDTO, 
  editProblemResponseDTO, 
  errorResponseDTO,
  addProblemResponseDTO,
  getStatisticIncorrectProblemDTO,
  getStatisticIncorrectTypeDTO,
  getStatisticIncorrectRatioDTO, 
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
    const userId = 1; // TODO : jwt 토큰에서 userId 추출
    const problems = await ProblemService.searchProblems(query, folderId, userId);
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
    res.send(response(status.BAD_REQUEST, errorResponseDTO("문제 등록 실패")));
  }
};

// 가장 많이 틀린 문제 가져오기
export const getStatisticIncorrectProblem = async (req, res) => {
    try{
    const statistic = await ProblemService.getStatisticIncorrectProblem();

    res.send(response(status.PROBLEM_STATISTIC_SUCCESS,statistic));
    //res.send(response(status.PROBLEM_STATISTIC_SUCCESS,getStatisticIncorrectProblemDTO(statistic)));

    } catch (error){
      res.send(response(status.INTERNAL_SERVER_ERROR));
  }
}

  


//가장 많이 틀린 유형 가져오기
export const getStatisticIncorrectType = async (req, res) => {
  try{
    const statistic = await ProblemService.getStatisticIncorrectType();

    //res.send(response(status.PROBLEM_STATISTIC_SUCCESS,getStatisticIncorrectTypeDTO(statistic)));
    res.send(response(status.PROBLEM_STATISTIC_SUCCESS,statistic));
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
}

//틀린 문제 유형 비율 가져오기
export const getStatisticIncorrectRatio = async (req, res) => {
  try{
    const statistic = await ProblemService.getStatisticIncorrectRatio();

    res.send(response(status.PROBLEM_STATISTIC_SUCCESS,getStatisticIncorrectRatioDTO(statistic)));
    res.send(response(status.PROBLEM_STATISTIC_SUCCESS,statistic));

  } catch(error){
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
}