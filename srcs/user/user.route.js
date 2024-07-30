import express from "express";
import { getInfo } from "./user.controller.js";

export const userRotuer = express.Router();

userRotuer.get("/info", getInfo);
