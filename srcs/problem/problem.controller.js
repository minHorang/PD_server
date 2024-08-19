import { status } from "../../config/response.status.js";
import { ProblemService } from "./problem.service.js";
import { response } from "../../config/response.js";
import { createMulter, getPublicUrl } from "../utils/image/image.upload.js";
import { 
  setScaleResponseDTO, 
  getProblemListResponseDTO, 
  getProblemResponseDTO, 
  editProblemResponseDTO, 
  errorResponseDTO,
  addProblemResponseDTO,
  problemTypeResponseDTO ,
  addProblemTypeResponseDTO,
  deleteProblemResponseDTO,
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

export const editProblem = async (req, res, next) => {
  try {
    const { problemId, answerText, problemText, mainCategoryId, categoryId, subCategoryId } = JSON.parse(req.body.data);
    const folders = {
      problemFolder: "problemImages",
      solutionFolder: "solutionImages",
      passageFolder: "passageImages",
      additionalFolder: "additionalImages",
  };

  // 실제 이미지 업로드
  const problemUrl = req.files.problemImage ? getPublicUrl(req.files.problemImage[0].filename) : null;
  const solutionUrl = req.files.solutionImage ? getPublicUrl(req.files.solutionImage[0].filename) : null;
  const passageUrl = req.files.passageImage ? getPublicUrl(req.files.passageImage[0].filename) : null;
  const additionalUrl = req.files.additionalImage ? getPublicUrl(req.files.additionalImage[0].filename) : null;

  // url 더미 데이터
  // const problemUrl = "https://storage.googleapis.com/quiz-app-2021/problemImages/1626820130000-IMG_20210630_153013.jpg";
  // const solutionUrl = "https://storage.googleapis.com/quiz-app-2021/solutionImages/1626820130000-IMG_20210630_153013.jpg";
  // const passageUrl = "https://storage.googleapis.com/quiz-app-2021/passageImages/1626820130000-IMG_20210630_153013.jpg";
  // const additionalUrl = "https://storage.googleapis.com/quiz-app-2021/additionalImages/1626820130000-IMG_20210630_153013.jpg";

  await ProblemService.updateProblemTextAndAnswer(problemId, problemText, answerText);
  await ProblemService.updateProblemTypes(problemId, [mainCategoryId, categoryId, subCategoryId]);

  await ProblemService.updateProblemPhotos(problemId, [
    { url: problemUrl, type: "problem" },
    { url: solutionUrl, type: "solution" },
    { url: passageUrl, type: "passage" },
    { url: additionalUrl, type: "additional" },
  ]);


  res.send(response(status.SUCCESS, editProblemResponseDTO("문제 수정 성공")));
  } catch (error) {
    res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
  }
};

// 문제 추가
export const addProblem = async (req, res) => {
  try {
    const problemData = req.body;
    const { mainTypeId, midTypeId, subTypeIds } = problemData;

    //problemData.userId = req.userId;
    problemData.userId = 1;

    if (mainTypeId !== undefined && mainTypeId !== null && typeof mainTypeId !== 'number') {
      return res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
    }

    if (midTypeId !== undefined && midTypeId !== null && typeof midTypeId !== 'number') {
      return res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
    }

    if (subTypeIds !== undefined && subTypeIds !== null) {
      if (typeof subTypeIds === 'number') {
        problemData.subTypeIds = [subTypeIds];
      } else if (Array.isArray(subTypeIds)) {
        if (subTypeIds.length > 5) {
          return res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
        }
      } else {
        return res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
      }
    }
    await ProblemService.addProblem(problemData);
    res.send(response(status.SUCCESS, addProblemResponseDTO("문제 추가 성공")));
  } catch (error) {
    res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
  }
};

// 문제 유형 목록 조회
export const getProblemTypes = async (req, res) => {
  try {
    const { typeLevel } = req.params;
    const { parentTypeId } = req.query;
    // const userId = req.userId;
    const userId = 1;

    let types;

    if (typeLevel === '1') {
      types = await ProblemService.getMainTypes(userId);
    } else if (typeLevel === '2') {
      if (!parentTypeId) {
        return res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
      }
      types = await ProblemService.getMidTypes(parentTypeId, userId);
    } else if (typeLevel === '3') {
      if (!parentTypeId) {
        return res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
      }
      types = await ProblemService.getSubTypes(parentTypeId, userId);
    } else {
      return res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
    }

    if (types && types.length > 0) {
      res.send(response(status.SUCCESS, problemTypeResponseDTO(types)));
    } else {
      res.send(response(status.NOT_FOUND, errorResponseDTO("데이터를 찾을 수 없습니다.")));
    }
  } catch (error) {
    res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
  }
};

// 문제 유형 추가
export const addProblemType = async (req, res) => {
  try {
    const { typeName, parentTypeId, typeLevel } = req.body;
    // const userId = req.userId;
    const userId = 1;

    if (typeLevel === 1) {
      await ProblemService.addProblemType(typeName, null, typeLevel, userId);
      res.send(response(status.SUCCESS, addProblemTypeResponseDTO("대분류 추가 성공")));
    } else if (typeLevel === 2) {
      if (!parentTypeId) {
        return res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
      }
      await ProblemService.addProblemType(typeName, parentTypeId, typeLevel, userId);
      res.send(response(status.SUCCESS, addProblemTypeResponseDTO("중분류 추가 성공")));
    } else if (typeLevel === 3) {
      if (!parentTypeId) {
        return res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
      }
      await ProblemService.addProblemType(typeName, parentTypeId, typeLevel, userId);
      res.send(response(status.SUCCESS, addProblemTypeResponseDTO("소분류 추가 성공")));
    } else {
      res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
    }
  } catch (error) {
    console.error("문제 유형 추가 중 에러:", error.message);
    res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
  }
};

export const deleteProblem = async (req, res) => {
  try {
    const { problemId } = req.params;
    // const userId = req.userId;
    const userId = 1;
    const deleted = await ProblemService.deleteProblem(problemId, userId);
    if (deleted) {
      res.send(response(status.SUCCESS, deleteProblemResponseDTO("문제 삭제 성공")));
    } else {
      res.send(response(status.NOT_FOUND, errorResponseDTO("데이터를 찾을 수 없습니다.")));
    }
  } catch (error) {
    res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
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