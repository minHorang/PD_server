import express from "express";

import {
  getPortfolio,
  getPortfolioDetail,
  postPortfolio,
  postSuggestTeam,
} from "./portfolio.controller.js";

export const portfolioRouter = express.Router();

portfolioRouter.get("/detail", getPortfolioDetail);
portfolioRouter.get("/category/:category", getPortfolio);
portfolioRouter.post("/suggest", postSuggestTeam);
portfolioRouter.post("/", postPortfolio);
