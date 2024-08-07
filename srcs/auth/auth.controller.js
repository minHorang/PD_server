// auth.controller.js
import { kakaoLogin, naverLogin, refreshTokens } from "./auth.service.js";

const handleKakaoLogin = async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(400).json({ error: "Authorization header missing" });
        }
        const kakaoToken = authorization.split(" ")[1];
        if (!kakaoToken) {
            return res.status(400).json({ error: "Kakao token missing" });
        }

        const { accessToken, refreshToken } = await kakaoLogin(kakaoToken);
        return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        return res.status(500).json({ error: "Kakao login failed", details: error.message });
    }
};

const handleNaverLogin = async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(400).json({ error: "Authorization header missing" });
        }

        const naverToken = authorization.split(" ")[1];
        if (!naverToken) {
            return res.status(400).json({ error: "Naver token missing" });
        }

        const { accessToken, refreshToken } = await naverLogin(naverToken);
        return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        return res.status(500).json({ error: "Naver login failed", details: error.message });
    }
};

const handleTokenRefresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ error: "Refresh token missing" });
        }
        const { accessToken, newRefreshToken } = await refreshTokens(refreshToken);
        return res.status(200).json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
        return res.status(500).json({ error: "Token refresh failed", details: error.message });
    }
};


export { handleKakaoLogin, handleNaverLogin, handleTokenRefresh };
