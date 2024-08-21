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
    const userId = req.userId;
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
    const {
      problemId,
      problemText,
      answer,
      status: problemStatus,
      memo,
      mainTypeId,
      midTypeId,
      subTypeIds
    } = JSON.parse(req.body.data);
    const userId = req.userId;
    await ProblemService.deleteTotalProblem(problemId);

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

    const getPublicUrls = (files, minCount, maxCount) => {
      if (!files || files.length < minCount || files.length > maxCount) {
        throw new Error(`사진은 ${minCount}장 이상 ${maxCount}장 이하로 제공되어야 합니다.`);
      }
      return files.map(file => getPublicUrl(file.filename));
    };


    const problemPhoto = getPublicUrls(req.files.problemImage, 1, 1);
    const solutionPhotos = getPublicUrls(req.files.solutionImages || [], 0, 5);
    const passagePhotos = getPublicUrls(req.files.passageImages || [], 0, 10);
    const additionalPhotos = getPublicUrls(req.files.additionalImages || [], 0, 2);

    const photos = [
      ...problemPhoto.map(url => ({ photoUrl: url, photoType: 'problem' })),
      ...solutionPhotos.map(url => ({ photoUrl: url, photoType: 'solution' })),
      ...passagePhotos.map(url => ({ photoUrl: url, photoType: 'passage' })),
      ...additionalPhotos.map(url => ({ photoUrl: url, photoType: 'additional' }))
    ];

    const problemData = {
      problemId,
      problemText,
      answer,
      status: problemStatus,
      memo,
      mainTypeId,
      midTypeId,
      subTypeIds,
      photos
    };

    await ProblemService.updateProblem(problemData, userId);

  res.send(response(status.SUCCESS, editProblemResponseDTO("문제 수정 성공")));
  } catch (error) {
    res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
  }
};

// 문제 추가
export const addProblem = async (req, res) => {
  try {
    const {
      folderId,
      problemText,
      answer,
      status: problemStatus,
      memo,
      mainTypeId,
      midTypeId,
      subTypeIds
    } = JSON.parse(req.body.data);

    const userId = req.userId;

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

    if (!req.files || !req.files.problemImage || req.files.problemImage.length === 0) {
      return res.send(response(status.BAD_REQUEST, errorResponseDTO("문제 이미지 누락")));
    }

    const getPublicUrls = (files, minCount, maxCount) => {
      if (!files || files.length < minCount || files.length > maxCount) {
        throw new Error(`사진은 ${minCount}장 이상 ${maxCount}장 이하로 제공되어야 합니다.`);
      }
      return files.map(file => getPublicUrl(file.filename));
    };

    const problemPhoto = getPublicUrls(req.files.problemImage, 1, 1);
    const solutionPhotos = getPublicUrls(req.files.solutionImages || [], 0, 5);
    const passagePhotos = getPublicUrls(req.files.passageImages || [], 0, 10);
    const additionalPhotos = getPublicUrls(req.files.additionalImages || [], 0, 2);

    const photos = [
      ...problemPhoto.map(url => ({ photoUrl: url, photoType: 'problem' })),
      ...solutionPhotos.map(url => ({ photoUrl: url, photoType: 'solution' })),
      ...passagePhotos.map(url => ({ photoUrl: url, photoType: 'passage' })),
      ...additionalPhotos.map(url => ({ photoUrl: url, photoType: 'additional' }))
    ];

    const problemData = {
      folderId,
      problemText,
      answer,
      status: problemStatus,
      memo,
      mainTypeId,
      midTypeId,
      subTypeIds,
      photos
    };

    await ProblemService.addProblem(problemData, userId);
  
    res.send(response(status.SUCCESS, addProblemResponseDTO("문제 추가 성공")));
  } catch (error) {
    console.error("문제 추가 실패:", error);
    res.send(response(status.BAD_REQUEST, errorResponseDTO("잘못된 요청 본문")));
  }
};

// 문제 유형 목록 조회
export const getProblemTypes = async (req, res) => {
  try {
    const { typeLevel } = req.params;
    const { parentTypeId } = req.query;
    const userId = req.userId;

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
    const userId = req.userId;

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

// 문제 삭제
export const deleteProblem = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.userId;
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

// 문제 유형 삭제
export const deleteProblemType = async (req, res) => {
  try {
    const { typeId } = req.params;
    const { typeLevel } = req.query;
    const userId = req.userId;

    if (!typeId || !typeLevel) {
      res.send(response(status.BAD_REQUEST, "잘못된 요청 본문"));
    }

    switch (parseInt(typeLevel, 10)) {
      case 1:
        // 대분류 삭제
        await ProblemService.deleteMainType(typeId, userId);
        res.send(response(status.SUCCESS, "대분류 삭제 성공"));
        break;
      case 2:
        // 중분류에 연관된 소분류 삭제
        await ProblemService.deleteSubTypesByMidType(typeId, userId);
        // 중분류 삭제
        await ProblemService.deleteMidType(typeId, userId);
        res.send(response(status.SUCCESS, "중분류 삭제 성공"));
        break;
      case 3:
        // 소분류 삭제
        await ProblemService.deleteSubType(typeId, userId);
        res.send(response(status.SUCCESS, "소분류 삭제 성공"));
        break;
      default:
        res.send(response(status.BAD_REQUEST, "잘못된 요청 본문"));
        break;
    }
  } catch (error) {
    console.error("문제 유형 삭제 중 에러:", error.message);
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};

// 가장 많이 틀린 문제 가져오기
export const getStatisticIncorrectProblem = async (req, res) => {
    try{
    const userId = req.userId;
    const statistic = await ProblemService.getStatisticIncorrectProblem(userId);

    res.send(response(status.PROBLEM_STATISTIC_SUCCESS,statistic));
    //res.send(response(status.PROBLEM_STATISTIC_SUCCESS,getStatisticIncorrectProblemDTO(statistic)));

    } catch (error){
      res.send(response(status.INTERNAL_SERVER_ERROR));
  }
}

  


//가장 많이 틀린 유형 가져오기
export const getStatisticIncorrectType = async (req, res) => {
  try{
    const userId = req.userId;
    const statistic = await ProblemService.getStatisticIncorrectType(userId);

    //res.send(response(status.PROBLEM_STATISTIC_SUCCESS,getStatisticIncorrectTypeDTO(statistic)));
    res.send(response(status.PROBLEM_STATISTIC_SUCCESS,statistic));
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
}

//틀린 문제 유형 비율 가져오기
export const getStatisticIncorrectRatio = async (req, res) => {
  try{
    const userId = req.userId;
    const statistic = await ProblemService.getStatisticIncorrectRatio(userId);

    //res.send(response(status.PROBLEM_STATISTIC_SUCCESS,getStatisticIncorrectRatioDTO(statistic)));
    res.send(response(status.PROBLEM_STATISTIC_SUCCESS,statistic));

  } catch(error){
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
}