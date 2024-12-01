// const express = require('express')   // common JS
import express from "express"; // ES6
import { response } from "./config/response.js";

import cors from "cors";
import { portfolioRouter } from "./srcs/portfolio/portfolio.route.js";
import dotenv from "dotenv";
import { teamRouter } from "./srcs/team/team.route.js";
import { collabRouter } from "./srcs/collab/collab.route.js";
dotenv.config();

const app = express();
const port = 4000;

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.use("/portfolio", portfolioRouter);

app.use("/project", teamRouter);
app.use("/collab", collabRouter);

app.use((err, req, res, next) => {
  // 템플릿 엔진 변수 설정
  res.locals.message = err.message;
  // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  console.log(err.message);
  res.status(err.data.status).send(response(err.data));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
