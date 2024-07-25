import express from 'express';
import { uploadImage } from "./image.upload.js";

export const imageRouter = express.Router();

imageRouter.post('/:folder', uploadImage);