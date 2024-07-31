// auth.controller.js

import { getKakaoTokens, getKakaoUserInfo, getNaverTokens, getNaverUserInfo, generateJwtToken, refreshJwtToken } from './auth.service.js';

export const kakaoLogin = async (req, res) => {
    const { code } = req.body;
    try {
        const tokens = await getKakaoTokens(code);
        const userInfo = await getKakaoUserInfo(tokens.access_token);
        const { accessToken, refreshToken } = await generateJwtToken({ id: userInfo.id, email: userInfo.kakao_account.email, provider: 'kakao' });
        res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error('Kakao login error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const naverLogin = async (req, res) => {
    const { code } = req.body;
    try {
        const tokens = await getNaverTokens(code);
        const userInfo = await getNaverUserInfo(tokens.access_token);
        const { accessToken, refreshToken } = await generateJwtToken({ id: userInfo.id, email: userInfo.email, provider: 'naver' });
        res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error('Naver login error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    try {
        const newAccessToken = await refreshJwtToken(refreshToken);
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const testAccessToken = async (req, res) => {
    const accessToken = req.headers['authorization']?.split(' ')[1];
    if (!accessToken) return res.status(400).json({ error: 'Access token is required' });
    try {
        const userInfo = await getKakaoUserInfo(accessToken);
        res.json({ userInfo });
    } catch (error) {
        console.error('Access token validation error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const testRefreshToken = async (req, res) => {
    const refreshToken = req.headers['authorization']?.split(' ')[1];
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token is required' });
    try {
        const newAccessToken = await refreshJwtToken(refreshToken);
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(500).json({ error: error.message });
    }
};
