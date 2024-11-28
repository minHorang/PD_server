import express from "express";
import {
  getTeam,
  getTeamDetail,
  postProject,
  postSuggestTeam,
} from "./collab.controller.js";

export const collabRouter = express.Router();

collabRouter.get("/list", getTeam);
collabRouter.get("/detail", getTeamDetail);
collabRouter.post("/suggest", postSuggestTeam);
collabRouter.post("/", postProject);
