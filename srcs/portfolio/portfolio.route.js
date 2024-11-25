import express from "express";

import { getPortfolio } from "./portfolio.controller.js";

export const portfolioRouter = express.Router();

portfolioRouter.get("/:category", getPortfolio);
