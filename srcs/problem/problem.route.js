import express from "express";
import { setScale, searchProblems, getProblem, editProblem, addProblem, deleteProblem, getProblemTypes, addProblemType , getStatisticIncorrectProblem, getStatisticIncorrectType, getStatisticIncorrectRatio } from "./problem.controller.js";
import authenticateToken from "../../config/jwt.middleware.js";

import { createMulter } from "../utils/image/image.upload.js";

  
export const problemRouter = express.Router();

const upload = createMulter("uploads");

problemRouter.patch("/scale", setScale);
problemRouter.get("/search", searchProblems);
problemRouter.get("/:problemId", getProblem);
problemRouter.patch("/edit", upload.fields([
    { name: 'problemImage', maxCount: 1 },
    { name: 'solutionImage', maxCount: 1 },
    { name: 'passageImage', maxCount: 1 },
    { name: 'additionalImage', maxCount: 4 }
  ]), editProblem);


// problemRouter.use(authenticateToken);
problemRouter.post("/folders/problems", addProblem);
problemRouter.get("/statistics/mistakes",getStatisticIncorrectProblem);
problemRouter.get("/statistics/types",getStatisticIncorrectType);
problemRouter.get("/statistics/ratios",getStatisticIncorrectRatio);

problemRouter.post("/", addProblem);
problemRouter.get("/types/:typeLevel", getProblemTypes);
problemRouter.post('/types', addProblemType);
problemRouter.delete("/:problemId", deleteProblem);