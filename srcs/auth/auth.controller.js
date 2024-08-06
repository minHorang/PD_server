// auth.controller.js
import { kakaoLogin, naverLogin } from "./auth.service.js";

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
        console.error(error);
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
        console.error(error);
        return res.status(500).json({ error: "Naver login failed", details: error.message });
    }
};

export { handleKakaoLogin, handleNaverLogin };
