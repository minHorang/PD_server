import express from "express";

import {
  getPortfolio,
  getPortfolioDetail,
  postPortfolio,
  postSuggestTeam,
} from "./portfolio.controller.js";
import { tempDbtest } from "../../temp/temp.controller.js";

export const portfolioRouter = express.Router();

portfolioRouter.get("/test", tempDbtest);

portfolioRouter.get("/detail", getPortfolioDetail);
portfolioRouter.get("/list", getPortfolio);
portfolioRouter.post("/suggest", postSuggestTeam);
portfolioRouter.post("/", postPortfolio);

portfolioRouter.get("/test", tempDbtest);
