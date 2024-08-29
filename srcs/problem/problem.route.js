import express from "express";
import { setScale, searchProblems, getProblem, editProblem, addProblem, deleteProblem, getProblemTypes, addProblemType , getStatisticIncorrectProblem, getStatisticIncorrectType, getStatisticIncorrectRatio, deleteProblemType } from "./problem.controller.js";
import authenticateToken from "../../config/jwt.middleware.js";

import { createMulter } from "../utils/image/image.upload.js";
import { uploadImage } from "../utils/image/image.upload.js";

export const problemRouter = express.Router();

const upload = createMulter("uploads");

problemRouter.use(authenticateToken);

problemRouter.patch("/scale", setScale);
problemRouter.get("/search", searchProblems);
problemRouter.get("/:problemId", getProblem);
problemRouter.patch("/edit", editProblem);


problemRouter.get("/statistics/mistakes",getStatisticIncorrectProblem);
problemRouter.get("/statistics/types",getStatisticIncorrectType);
problemRouter.get("/statistics/ratios/:categoryId", getStatisticIncorrectRatio);

problemRouter.post("/upload", uploadImage);
problemRouter.post("/", addProblem);
problemRouter.get("/types/:typeLevel", getProblemTypes);
problemRouter.post('/types', addProblemType);
problemRouter.delete("/:problemId", deleteProblem);
problemRouter.delete('/types/:typeId', deleteProblemType);