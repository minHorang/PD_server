

export const getStatisticIncorrectProblemDTO = (problems) => problems.map(problem => ({
    problemId: problem.problem_id,
    problemImage: problem.problem_image,
    problemText: problem.problem_text,
  }));
  
  export const getStatisticIncorrectTypeDTO = (data) => ({
    mainCategory: data.mainCategory,
    category: data.category,
    subCategories: data.subCategories.map(sub => ({
        subCategory: sub.subCategory,
        totalIncorrect: sub.totalIncorrect
    }))
  });
  
  
  
  export const getStatisticIncorrectRatioDTO = (data) => ({
    subCategories: data.map(sub => ({
        subCategory: sub.sub_category,
        incorrectPercentage: sub.incorrect_percentage
    }))
  });
  