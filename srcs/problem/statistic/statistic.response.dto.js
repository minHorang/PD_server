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
  

  export const errorResponseDTO = (message) => ({
    message: message
  });