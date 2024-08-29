import { StatisticModel } from "./statistic.model.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

export const StatisticService = {
    
  getStatisticIncorrectProblem: async (userId) => {
    try{
      
      return await StatisticModel.getIncorrectProblemStatistic(userId);
    } catch (error) {
      throw new BaseError(status.INTERNAL_SERVER_ERROR,"틀린 문제 통계 조회 실패")
    }
  },
  

  getStatisticIncorrectType: async (userId) => {
    try {
        // 1. 가장 많이 틀린 category의 ID와 상위 category 이름 조회
        const mostIncorrectCategory = await StatisticModel.getMostIncorrectCategoryId(userId);
        
        if (!mostIncorrectCategory || mostIncorrectCategory.length === 0) {
            return null;  // 해당 사용자가 틀린 문제가 없는 경우 처리
        }

        const { category_id, main_category, category } = mostIncorrectCategory[0];

        // 2. 해당 category의 하위 카테고리 조회
        const subCategories = await StatisticModel.getSubCategoriesByCategoryId(category_id, userId);

        // 3. 최종 데이터 조합
        return {
            mainCategory: main_category,
            category: category,
            subCategories: subCategories.map(sub => ({
                subCategory: sub.sub_category,
                totalIncorrect: sub.total_incorrect
            }))
        };

    } catch (error) {
        throw new BaseError(status.INTERNAL_SERVER_ERROR, "틀린 문제 유형 통계 조회 실패");
    }
  },
  

  getStatisticIncorrectRatio: async (userId, categoryId) => {
    try {
        // 특정 category_id에 대한 하위 subcategory 비율 조회
        const result = await StatisticModel.getIncorrectRatioByCategoryId(categoryId, userId);
        return result;
    } catch (error) {
        throw new BaseError(status.INTERNAL_SERVER_ERROR, "틀린 문제 비율 통계 조회 실패");
    }
},
}