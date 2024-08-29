
  // 문제 검색 응답 DTO
  export const getProblemListResponseDTO = (problems) => {
    return problems.map(problem => ({
      problemId: problem.problem_id.toString(),
      problemImage: problem.problemImage || null,
      problemText: problem.problem_text
    }));
  };
  
  // 문제 조회 응답 DTO
  export const getProblemResponseDTO = (problem, sessionKey) => ({
    problemId: problem.problem_id.toString(),
    answer: problem.answer,


    problemImage: problem.photos.problem ? problem.photos.problem[0] : "",
    solutionImages: problem.photos.solution || [],
    passageImages: problem.photos.passage || [],
    additionalProblemImages: problem.photos.additional || [],
    memo : problem.memo,

    problemText: problem.problem_text,
    gptSessionKey: sessionKey,
  
    problemType: {
      대분류: problem.types.filter(type => type.type_level === 1).map(type => type.type_name).join(', '),
      중분류: problem.types.filter(type => type.type_level === 2).map(type => type.type_name).join(', '),
      소분류: problem.types.filter(type => type.type_level === 3).map(type => type.type_name).join(', ')
    },
    statistics: {
      wrongCount: problem.incorrect_count,
      solvedCount: problem.correct_count
    }
  });
  
  
  // 문제 수정 응답 DTO
  export const editProblemResponseDTO = (message) => ({
    message,
  });
  
  // 공통 에러 응답 DTO
  export const errorResponseDTO = (message) => ({
    message,
  });

  // 문제 추가 응답 DTO
  export const addProblemResponseDTO = (problemId) => ({
    problemId
  });

  export const problemTypeResponseDTO = (types) => ({
    types,
  });

  // 문제 유형 추가 응답 DTO
  export const addProblemTypeResponseDTO = (typeId, typeName) => ({
    typeId,
    typeName
  });


  export const deleteProblemResponseDTO = (message) => ({
    message,
  });
