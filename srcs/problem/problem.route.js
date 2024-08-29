import express from "express";
import { editProblem, addProblem, deleteProblem, getProblemTypes, addProblemType , deleteProblemType } from "./problem.controller.js";
import { getStatisticIncorrectProblem, getStatisticIncorrectType, getStatisticIncorrectRatio , getAllIncorrectGroupedByCategory } from "./statistic/statistic.controller.js";
import { getProblem, searchProblems } from "./search/search.controller.js";
import authenticateToken from "../../config/jwt.middleware.js";

import { createMulter } from "../utils/image/image.upload.js";
import { uploadImage } from "../utils/image/image.upload.js";

export const problemRouter = express.Router();

const upload = createMulter("uploads");

problemRouter.use(authenticateToken);

problemRouter.get("/search", searchProblems);
problemRouter.get("/:problemId", getProblem);


problemRouter.get("/statistics/mistakes",getStatisticIncorrectProblem);
problemRouter.get("/statistics/types",getStatisticIncorrectType);
problemRouter.get("/statistics/ratios/:categoryId", getStatisticIncorrectRatio);
problemRouter.get("/statistics/incorrects/types", getAllIncorrectGroupedByCategory);

problemRouter.post("/image", uploadImage);
problemRouter.post("/", addProblem);
problemRouter.patch("/edit", editProblem);

problemRouter.get("/types/:typeLevel", getProblemTypes);
problemRouter.post('/types', addProblemType);
problemRouter.delete("/:problemId", deleteProblem);
problemRouter.delete('/types/:typeId', deleteProblemType);