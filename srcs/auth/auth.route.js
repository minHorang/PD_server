// auth.route.js
import express from "express";
import { handleKakaoLogin, handleNaverLogin } from "./auth.controller.js";

const router = express.Router();

router.post('/kakao', handleKakaoLogin);
router.post('/naver', handleNaverLogin);

const authRoutes = router; 

export { authRoutes };