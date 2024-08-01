// auth.controller.js

import { getKakaoTokens, getKakaoUserInfo, getNaverTokens, getNaverUserInfo, generateJwtToken, refreshJwtToken, invalidateRefreshToken } from './auth.service.js';

export const kakaoLogin = async (req, res) => {
    const { code, state } = req.body;
    try {
        const tokens = await getKakaoTokens(code, state);
        const userInfo = await getKakaoUserInfo(tokens.access_token);
        const { accessToken, refreshToken } = await generateJwtToken({ id: userInfo.id, email: userInfo.kakao_account.email, provider: 'kakao' });
        res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error('Kakao login error:', error);
        res.status(500).json({ error: 'Internal server error during Kakao login' });
    }
};

export const naverLogin = async (req, res) => {
    const { code, state } = req.body;
    try {
        const tokens = await getNaverTokens(code, state);
        const userInfo = await getNaverUserInfo(tokens.access_token);
        const { accessToken, refreshToken } = await generateJwtToken({ id: userInfo.id, email: userInfo.email, provider: 'naver' });
        res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error('Naver login error:', error);
        res.status(500).json({ error: 'Internal server error during Naver login' });
    }
};

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        const newAccessToken = await refreshJwtToken(refreshToken);
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(401).json({ error: 'Invalid refresh token' });
    }
};
