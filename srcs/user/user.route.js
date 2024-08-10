import express from "express";
import {
  getInfo,
  patchNickname,
  deleteUser,
  userLogout,
  signupUser,
  loginUser,
} from "./user.controller.js";

export const userRotuer = express.Router();

userRotuer.get("/info", getInfo);
userRotuer.patch("/info/nickname", patchNickname);
userRotuer.patch("/delete", deleteUser);
userRotuer.get("/logout", userLogout);
userRotuer.post("/login/signUp", signupUser);
userRotuer.post("/login/general", loginUser);
