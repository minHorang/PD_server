// auth.route.js
import express from "express";
import { handleKakaoLogin, handleNaverLogin, handleTokenRefresh } from "./auth.controller.js";

const router = express.Router();

router.post('/kakao', handleKakaoLogin);
router.post('/naver', handleNaverLogin);
router.post('/refresh', handleTokenRefresh);

const authRoutes = router; 

export default authRoutes;
