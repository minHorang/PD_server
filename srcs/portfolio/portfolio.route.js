import express from "express";

import {
  getPortfolio,
  getPortfolioDetail,
  postPortfolio,
  postSuggestTeam,
} from "./portfolio.controller.js";

export const portfolioRouter = express.Router();

portfolioRouter.get("/list", getPortfolio);
portfolioRouter.get("/detail", getPortfolioDetail);
portfolioRouter.post("/suggest", postSuggestTeam);
portfolioRouter.post("/", postPortfolio);
