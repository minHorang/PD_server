import express from 'express';
import { selectFolder, getProblemByFolderAndIndex, checkAnswer, getProgress } from './study.controller.js';

export const studyRouter = express.Router();

studyRouter.get('/folders/:folderId', selectFolder);
studyRouter.get('/folders/:folderId/problems/:problemIndex', getProblemByFolderAndIndex);
studyRouter.post('/folders/:folderId/problems/:problemId/check-answer', checkAnswer);
studyRouter.get('/folders/:folderId/progress', getProgress);
