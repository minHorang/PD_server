import express from "express";
import { tempDbtest, tempTest } from "./temp.controller.js";
import { tempException } from "./temp.controller.js";
import { testDB } from "./temp.service.js";

export const tempRouter = express.Router();

tempRouter.get("/test", tempDbtest);

tempRouter.get("/exception/:flag", tempException);

tempRouter.get("/testdb", tempDbtest);
