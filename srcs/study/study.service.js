import { StudyModel } from './study.model.js';

export const StudyService = {
    selectFolder: async (folderId, userId) => {
      const folder = await StudyModel.findFolderByIdAndUserId(folderId, userId);
      if (!folder) {
        throw new Error("데이터를 찾을 수 없습니다.");
      }
      return folder;
    },


    getProblemByFolderAndIndex: async (folderId, problemIndex, userId) => {
        const folder = await StudyModel.findFolderByIdAndUserId(folderId, userId);
        if (!folder) {
          throw new Error("데이터를 찾을 수 없습니다.");
        }
        const problem = await StudyModel.findProblemByFolderIdAndIndex(folderId, problemIndex);
        if (!problem) {
          throw new Error("데이터를 찾을 수 없습니다.");
        }
        const folderName = await StudyModel.findFolderNameById(folderId);
        const problemImage = await StudyModel.findProblemImageById(problem.problem_id);
        return {
          ...problem,
          folderName: folderName.folder_name,
          problemImage: problemImage ? problemImage.problem_image_url : null
        };
    },


  checkAnswer: async (folderId, problemId, swipeDirection, userId) => {
    // 폴더와 사용자를 확인
    const folder = await StudyModel.findFolderByIdAndUserId(folderId, userId);
    if (!folder) {
      throw new Error("데이터를 찾을 수 없습니다.");
    }

    const problem = await StudyModel.findAnswerByProblemId(problemId);
    if (!problem) {
      throw new Error("데이터를 찾을 수 없습니다.");
    }

    const correctAnswer = problem.answer_text;
    let status;
    if (swipeDirection === 'right') {
      await StudyModel.updateCorrectCount(problemId);
      status = "맞은 문제";
    } else {
      await StudyModel.updateIncorrectCount(problemId);
      status = "틀린 문제";
    }

    return {
      status,
      correctAnswer
    };
  },


  getProgressByFolder: async (folderId, userId) => {
    const folder = await StudyModel.findFolderByIdAndUserId(folderId, userId);
    if (!folder) {
      throw new Error("데이터를 찾을 수 없습니다.");
    }
    return await StudyModel.findProgressByFolderId(folderId);
  }
};


