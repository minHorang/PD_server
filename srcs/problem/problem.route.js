import express from "express";
import { setScale, searchProblems, getProblem, editProblem, addProblem, getMainTypes, getMidTypes, getSubTypes} from "./problem.controller.js";

export const problemRouter = express.Router();

problemRouter.patch("/scale", setScale);
problemRouter.get("/search", searchProblems);
problemRouter.get("/:problemId", getProblem);
problemRouter.patch("/:problemId/edit", editProblem);
problemRouter.post("/", addProblem);
problemRouter.get("/types/main", getMainTypes);
problemRouter.get("/types/mid/:parentTypeId", getMidTypes);
problemRouter.get("/types/sub/:parentTypeId", getSubTypes);
