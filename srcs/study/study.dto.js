export const getFolderResponseDTO = (folder) => ({
    message: "폴더 선택 완료",
    folderId: folder.folder_id.toString()
});

export const getProblemResponseDTO = (problem) => ({
    problemId: problem.problem_id.toString(),
    problemImage: problem.problemImage || null,
    folderName: problem.folderName
});

export const checkAnswerResponseDTO = (result) => ({
    status: result.status,
    correctAnswer: result.correctAnswer
});


export const getProgressResponseDTO = (progress) => {
    return progress.map(item => ({
      problemId: item.problem_id.toString(),
      status: item.status
    }));
};

export const errorResponseDTO = (message) => ({
    message
});
