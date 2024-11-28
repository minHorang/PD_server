import express from "express";
import {
  getMypage,
  getTeam,
  getTeamDetail,
  postProject,
  postSuggestTeam,
} from "./team.controller.js";

export const teamRouter = express.Router();

teamRouter.get("/list", getTeam);
teamRouter.get("/detail", getTeamDetail);
teamRouter.post("/suggest", postSuggestTeam);
teamRouter.post("/", postProject);

teamRouter.get("/mypage", getMypage);
