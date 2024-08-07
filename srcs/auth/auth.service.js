// auth.service.js
import axios from "axios";
import jwt from "jsonwebtoken";
import { getUserBySocialId, signUp, updateRefreshToken } from "./auth.model.js";

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: userId }, JWT_REFRESH_SECRET, { expiresIn: "30d" });
    return { accessToken, refreshToken };
};

// 액세스 토큰로 유저아이디 반환
const getUserIdFromAccessToken = (accessToken) => {
    try {
        const decoded = jwt.verify(accessToken, JWT_SECRET);
        return decoded.id;
    } catch (error) {
        throw new Error('유효하지 않거나 만료된 액세스 토큰');
    }
};

const kakaoLogin = async (kakaoToken) => {
    try {
        const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: { Authorization: `Bearer ${kakaoToken}` },
        });

        const { data } = result;
        const { nickname: name, profile_image: profileImage } = data.properties;
        const kakaoId = data.id;

        if (!name || !kakaoId) throw new Error("KEY_ERROR");

        let user = await getUserBySocialId(kakaoId, "kakao");

        let accessToken, refreshToken;

        if (!user) {
            const userId = await signUp(name, kakaoId, profileImage, "kakao", refreshToken);
            ({ accessToken, refreshToken } = generateTokens(userId));
            console.log(userId)
        } else {
            ({ accessToken, refreshToken } = generateTokens(user.user_id));
            await updateRefreshToken(user.user_id, refreshToken);
        }
        return { accessToken, refreshToken};
    } catch (error) {
        console.error("Kakao login error:", error);
        throw new Error("Kakao login failed");
    }
};

const naverLogin = async (naverToken) => {
    const result = await axios.get("https://openapi.naver.com/v1/nid/me", {
        headers: { Authorization: `Bearer ${naverToken}` },
    });

    const { response } = result.data;
    const { name, id: naverId, profile_image: profileImage } = response;

    if (!name || !naverId) throw new Error("KEY_ERROR");

    let user = await getUserBySocialId(naverId, "naver");
    let accessToken, refreshToken;

    if (!user) {
        const userId = await signUp(name, naverId, profileImage, "naver", naverToken);
        ({ accessToken, refreshToken } = generateTokens(userId));
    } else {
        ({ accessToken, refreshToken } = generateTokens(user.user_id));
        await updateRefreshToken(user.user_id, refreshToken);
    }

    return { accessToken, refreshToken};
};


const refreshTokens = async (refreshToken) => {
    try {
        console.log("Received refresh token:", refreshToken);
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        const userId = decoded.id;
        console.log("Decoded userId:", userId);

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(userId);
        console.log("access token 생성:", accessToken);
        console.log("refresh token 생성:", newRefreshToken);

        await updateRefreshToken(userId, newRefreshToken);
        console.log("refreshToken 업데이트 완료");

        return { accessToken, newRefreshToken };
    } catch (error) {
        console.error("Error in refreshTokens:", error);
        throw new Error("Invalid or expired refresh token");
    }
};

export { kakaoLogin, naverLogin, refreshTokens, getUserIdFromAccessToken, generateTokens };
