// auth.controller.js
import { kakaoLogin, naverLogin, refreshTokens } from "./auth.service.js";
import { response } from "../../config/response.js";

const extractTokenFromHeader = (req) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error("Authorization header missing or invalid");
    }
    return authHeader.split(' ')[1];
};

// 카카오 로그인 처리
const handleKakaoLogin = async (req, res) => {
    try {
        const kakaoToken = extractTokenFromHeader(req);
        const { accessToken, refreshToken } = await kakaoLogin(kakaoToken);
        
        // 액세스 토큰을 헤더에 추가
        res.setHeader('Authorization', `Bearer ${accessToken}`);

        return res.status(200).json(
            response(
                { isSuccess: true, code: 200, message: "카카오 로그인 성공" },
                { refreshToken }
            )
        );
    } catch (error) {
        return res.status(400).json(
            response(
                { isSuccess: false, code: 400, message: "카카오 로그인 실패" },
                { errorMessage: error.message }
            )
        );
    }
};

// 네이버 로그인 처리
const handleNaverLogin = async (req, res) => {
    try {
        const naverToken = extractTokenFromHeader(req);
        const { accessToken, refreshToken } = await naverLogin(naverToken);
        
        // 액세스 토큰을 헤더에 추가
        res.setHeader('Authorization', `Bearer ${accessToken}`);

        return res.status(200).json(
            response(
                { isSuccess: true, code: 200, message: "네이버 로그인 성공" },
                { refreshToken }
            )
        );
    } catch (error) {
        return res.status(400).json(
            response(
                { isSuccess: false, code: 400, message: "네이버 로그인 실패" },
                { errorMessage: error.message }
            )
        );
    }
};

// 토큰 재발급 처리
const handleTokenRefresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json(
                response(
                    { isSuccess: false, code: 400, message: "Refresh token missing" },
                    {}
                )
            );
        }
        const { accessToken, newRefreshToken } = await refreshTokens(refreshToken);

        // 액세스 토큰을 헤더에 추가
        res.setHeader('Authorization', `Bearer ${accessToken}`);

        return res.status(200).json(
            response(
                { isSuccess: true, code: 200, message: "토큰 재발급 성공" },
                { newRefreshToken }
            )
        );
    } catch (error) {
        return res.status(400).json(
            response(
                { isSuccess: false, code: 400, message: "토큰 재발급 실패" },
                { errorMessage: error.message }
            )
        );
    }
};

export { handleKakaoLogin, handleNaverLogin, handleTokenRefresh, extractTokenFromHeader };
