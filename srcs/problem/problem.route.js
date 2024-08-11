import express from "express";
import { setScale, searchProblems, getProblem, editProblem, addProblem, getStatisticIncorrectProblem, getStatisticIncorrectType, getStatisticIncorrectRatio } from "./problem.controller.js";

export const problemRouter = express.Router();

problemRouter.patch("/scale", setScale);
problemRouter.get("/search", searchProblems);
problemRouter.get("/:problemId", getProblem);
problemRouter.patch("/:problemId/edit", editProblem);
problemRouter.post("/folders/problems", addProblem);
problemRouter.get("/statistics/mistakes",getStatisticIncorrectProblem);
problemRouter.get("/statistics/types",getStatisticIncorrectType);
problemRouter.get("/statistics/ratios",getStatisticIncorrectRatio);
