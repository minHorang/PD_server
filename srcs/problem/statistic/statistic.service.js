import { StatisticModel } from "./statistic.model.js";
import { BaseError } from "../../../config/error.js";
import { status } from "../../../config/response.status.js";

export const StatisticService = {
    

    getStatisticIncorrectProblem: async (userId) => {
        try {
            // 1. 문제 데이터 가져오기
            const problems = await StatisticModel.getIncorrectProblemStatistic(userId);
            if (!problems || problems.length === 0) {
                return [];
            }

            // 2. 문제 ID 추출
            const problemIds = problems.map(problem => problem.problem_id);

            // 3. 각 문제에 대한 이미지 URL 가져오기
            const images = await StatisticModel.getProblemImageUrls(problemIds);

            // 4. 문제 데이터와 이미지 URL 결합
            const problemsWithImages = problems.map(problem => {
                const image = images.find(img => img.problem_id === problem.problem_id);
                return {
                    ...problem,
                    problemImage: image ? image.problemImage : null  // 이미지가 없는 경우 null 처리
                };
            });

            return problemsWithImages;
        } catch (error) {
            throw new BaseError(status.INTERNAL_SERVER_ERROR, "틀린 문제 조회 실패");
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


  getAllIncorrectGroupedByCategory: async (userId) => {
    try {
        const results = await StatisticModel.getAllIncorrectGroupedByCategory(userId);

        const groupedResult = results.reduce((acc, curr) => {
            const { main_category, category, sub_category, total_incorrect } = curr;

            let mainCategoryObj = acc.find(item => item.mainCategory === main_category);
            if (!mainCategoryObj) {
                mainCategoryObj = {
                    mainCategory: main_category,
                    categories: []
                };
                acc.push(mainCategoryObj);
            }

            let categoryObj = mainCategoryObj.categories.find(item => item.category === category);
            if (!categoryObj) {
                categoryObj = {
                    category: category,
                    subCategories: []
                };
                mainCategoryObj.categories.push(categoryObj);
            }

            categoryObj.subCategories.push({
                subCategory: sub_category,
                totalIncorrect: total_incorrect
            });

            return acc;
        }, []);

        return groupedResult;
    } catch (error) {
        throw new BaseError(status.INTERNAL_SERVER_ERROR, "문제 틀린 횟수 계산 실패");
    }
  } 
}

