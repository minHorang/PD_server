// 문제 스케일 설정 응답 DTO
export const setScaleResponseDTO = (scale) => ({
    scale,
  });
  
  // 문제 검색 응답 DTO
  export const searchProblemsResponseDTO = (problems) => problems.map(problem => ({
    problemId: problem.problemId,
    problemImage: problem.problemImage,
    problemText: problem.problemText,
  }));
  
  // 문제 조회 응답 DTO
  export const getProblemResponseDTO = (problem) => ({
    problemId: problem.problemId,
    problemImage: problem.problemImage,
    answer: problem.answer,
    solutionImage: problem.solutionImage,
    passageImage: problem.passageImage,
    additionalProblemImage: problem.additionalProblemImage,
    problemText: problem.problemText,
    problemType: problem.problemType,
    statistics: {
      wrongCount: problem.wrongCount,
      solvedCount: problem.solvedCount,
    },
  });
  
  // 문제 수정 응답 DTO
  export const editProblemResponseDTO = (message) => ({
    message,
  });
  
  // 공통 에러 응답 DTO
  export const errorResponseDTO = (message) => ({
    message,
  });

  export const addProblemResponseDTO = (message) => ({
    message,
  });

  export const problemTypeResponseDTO = (types) => ({
    types,
  });
