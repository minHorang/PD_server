import { status } from "../../../config/response.status.js";
import { StatisticService } from "./statistic.service.js";
import { response } from "../../../config/response.js";


import {
    getStatisticIncorrectTypeDTO,
    getStatisticIncorrectRatioDTO, 
    errorResponseDTO,
} from "./statistic.response.dto.js";



// 가장 많이 틀린 문제 가져오기
export const getStatisticIncorrectProblem = async (req, res) => {
    try{
    const userId = req.userId;
    const statistic = await StatisticService.getStatisticIncorrectProblem(userId);

    if (!statistic || statistic.length === 0) {
        return res.send(response(status.NO_CONTENT, null));  // 데이터가 없는 경우 처리
    }
    res.send(response(status.PROBLEM_STATISTIC_SUCCESS,statistic));

    } catch (error){
      res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};

export const getStatisticIncorrectType = async (req, res) => {
  try {
      const userId = req.userId;
      const statistic = await StatisticService.getStatisticIncorrectType(userId);
      
      if (!statistic) {
          return res.send(response(status.NO_CONTENT, null));  // 틀린 문제가 없는 경우 처리
      }

      // DTO로 변환하여 응답
      const statisticDTO = getStatisticIncorrectTypeDTO(statistic);
      res.send(response(status.PROBLEM_STATISTIC_SUCCESS, statisticDTO));
  } catch (error) {
      res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};



export const getStatisticIncorrectRatio = async (req, res) => {
  try {
      const userId = req.userId;
      const { categoryId } = req.params;  // category_id를 파라미터로 받음

      if (!categoryId) {
          return res.send(response(status.BAD_REQUEST, "카테고리 ID가 필요합니다."));
      }

      const statistic = await StatisticService.getStatisticIncorrectRatio(userId, categoryId);

      if (!statistic || statistic.length === 0) {
          return res.send(response(status.NO_CONTENT, null));  // 데이터가 없는 경우 처리
      }

      // DTO로 변환하여 응답
      const statisticDTO = getStatisticIncorrectRatioDTO(statistic);
      res.send(response(status.PROBLEM_STATISTIC_SUCCESS, statisticDTO));
  } catch (error) {
      res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};

export const getAllIncorrectGroupedByCategory = async (req, res) => {
    try {
        const userId = req.userId;
        const result = await StatisticService.getAllIncorrectGroupedByCategory(userId);

        if (!result || result.length === 0) {
            return res.send(response(status.NO_CONTENT, null));  // 데이터가 없는 경우 처리
        }

        res.send(response(status.PROBLEM_STATISTIC_SUCCESS, result));
    } catch (error) {
        res.send(response(status.INTERNAL_SERVER_ERROR));
    }
};