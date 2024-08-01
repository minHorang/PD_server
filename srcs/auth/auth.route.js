import express from 'express';
import { kakaoLogin, naverLogin, refreshToken, testAccessToken, testRefreshToken } from './auth.controller.js';

const router = express.Router();

router.post('/kakao', kakaoLogin);
router.post('/naver', naverLogin);
router.post('/refresh', refreshToken);

export default router;
