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

export const getProblemResponseDTO = (problem, folderName) => ({
  problemId: problem.problem_id.toString(),
  folderName: folderName,
  problemImage: problem.photos.find(photo => photo.photo_type === 'problem')?.photo_url || null,
  answer: problem.answer,
  solutionImage: problem.photos.find(photo => photo.photo_type === 'solution')?.photo_url || null,
  passageImage: problem.photos.find(photo => photo.photo_type === 'passage')?.photo_url || null,
  additionalProblemImage: problem.photos.filter(photo => photo.photo_type === 'additional').map(photo => photo.photo_url),
  problemText: problem.problem_text,
  gptSessionKey: problem.gpt_session_key,

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
