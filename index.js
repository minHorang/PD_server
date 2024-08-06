// const express = require('express')   // common JS
import express from "express"; // ES6
import { tempRouter } from "./temp/temp.route.js";
import { response } from "./config/response.js";
import { specs } from "./config/swagger.config.js";
import SwaggerUi from "swagger-ui-express";
import { healthCheck } from "./srcs/utils/healthCheck.js";
import { imageRouter } from "./srcs/utils/image/image.route.js";
import { problemRouter } from "./srcs/problem/problem.route.js";
import cors from "cors";
import { userRotuer } from "./srcs/user/user.route.js";

const app = express();
const port = 3000;

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

// router setting
app.use("/temp", tempRouter);
app.use("/problems", problemRouter);

//health
app.use("/health", healthCheck);

app.use("/upload", imageRouter);

app.use("/users", userRotuer);

//swagger
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(specs));

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
