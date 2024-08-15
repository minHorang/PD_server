import SwaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    info: {
      title: "WASH API",
      version: "1.0.0",
      description:
        "wash api / 헤더로 토큰 넣으실때 {Bearer AcessToken} 형식으로 중괄호 내부 값만 넣으셔야 합니다",
    },
    host: "localhost:3000",
    basepath: "../",
  },
  apis: ["./src/routes/*.js", "./swagger/*"],
};

export const specs = SwaggerJsdoc(options);
