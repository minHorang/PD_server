import express from 'express';
import { kakaoLogin, naverLogin, refreshToken, testAccessToken, testRefreshToken } from './auth.controller.js';

const router = express.Router();

router.post('/kakao', kakaoLogin);
router.post('/naver', naverLogin);
router.post('/refresh', refreshToken);
router.post('/test-access-token', testAccessToken); // 액세스 토큰 검증 엔드포인트

export default router;
