import { StudyModel } from './study.model.js';

export const StudyService = {
  selectFolder: async (folderId) => {
    const folder = await StudyModel.findFolderById(folderId);
    if (!folder) {
      throw new Error("데이터를 찾을 수 없습니다.");
    }
    const problemIds = await StudyModel.findProblemIdsByFolderId(folderId);
    return {
      folderName: folder.folder_name,
      problemIds: problemIds.map(id => id.toString())
    };
  },

  updateAllProblemsStatus: async (folderId, progress) => {
    await StudyModel.updateAllProblemsStatus(folderId, progress);
  },

  getProgressByFolder: async (folderId) => {
    const folder = await StudyModel.findFolderById(folderId);
    if (!folder) {
      throw new Error("데이터를 찾을 수 없습니다.");
    }
    return await StudyModel.findProgressByFolderId(folderId);
  },


  checkAnswer: async (folderId, problemId, swipeDirection) => {
    const folder = await StudyModel.findFolderById(folderId);
    if (!folder) {
      throw new Error("데이터를 찾을 수 없습니다.");
    }

    const problem = await StudyModel.findAnswerByProblemId(problemId);
    if (!problem) {
      throw new Error("데이터를 찾을 수 없습니다.");
    }

    const correctAnswer = problem.answer;
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
  }
};
