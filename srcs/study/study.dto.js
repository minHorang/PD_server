export const getFolderResponseDTO = (folder) => ({
  message: "폴더 선택 완료",
  folderName: folder.folderName,
  problemIds: folder.problemIds
});

export const getProgressResponseDTO = (progress) => {
  return progress.map(item => ({
    problemId: item.problem_id.toString(),
    status: item.status
  }));
};

export const getProblemResponseDTO = (problem, folderName, sessionKey) => ({
  problemId: problem.problem_id.toString(),
  folderName: folderName,
  answer: problem.answer,

  problemImage: problem.photos.problem ? problem.photos.problem[0] : "",
  solutionImages: problem.photos.solution || [],
  passageImages: problem.photos.passage || [],
  additionalProblemImages: problem.photos.additional || [],

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
export const checkAnswerResponseDTO = (result) => ({
  status: result.status,
  correctAnswer: result.correctAnswer
});

export const errorResponseDTO = (message) => ({
  message
});
