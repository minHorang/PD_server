import express from "express";
import authenticateToken from "../../config/jwt.middleware.js";
import {subscribe, cancelSubscribe } from "../subscription/subscription.controller.js"

export const subscriptionRouter = express.Router();
subscriptionRouter.use(authenticateToken);

subscriptionRouter.patch("/approve", subscribe);
subscriptionRouter.patch("/cancel", cancelSubscribe);