import express from "express";

import {
  getMyWrite,
  getPortfolio,
  getPortfolioDetail,
  postPortfolio,
  postSuggestTeam,
} from "./portfolio.controller.js";

export const portfolioRouter = express.Router();

portfolioRouter.get("/list", getPortfolio);
portfolioRouter.get("/detail", getPortfolioDetail);
portfolioRouter.get("/title", getMyWrite);
portfolioRouter.post("/suggest", postSuggestTeam);
portfolioRouter.post("/", postPortfolio);
