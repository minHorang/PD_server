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
