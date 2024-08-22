import express from 'express';
import { uploadImage, uploadProblemImages } from "./image.upload.js";

export const imageRouter = express.Router();

imageRouter.post('/:folder', uploadImage);
imageRouter.post('/problem/:folder', uploadProblemImages);