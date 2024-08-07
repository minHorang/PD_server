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

const kakaoLogin = async (kakaoToken) => {
    try {
        // 카카오 API로부터 사용자 정보 가져오기
        const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: { Authorization: `Bearer ${kakaoToken}` },
        });

        const { data } = result;
        const { nickname: name, profile_image: profileImage } = data.properties;
        const kakaoId = data.id;

        if (!name || !kakaoId) throw new Error("KEY_ERROR");

        // 카카오 ID로 사용자 검색
        let user = await getUserBySocialId(kakaoId, "kakao");

        let accessToken, refreshToken;

        if (!user) {
            // 신규 사용자 등록
            ({ accessToken, refreshToken } = generateTokens(kakaoId)); // socialId를 사용자 ID로 사용
            await signUp(name, kakaoId, profileImage, "kakao", refreshToken);
        } else {
            // 기존 사용자에게 새로운 토큰 생성
            ({ accessToken, refreshToken } = generateTokens(user.user_id));
            await updateRefreshToken(user.user_id, refreshToken);
        }

        return { accessToken, refreshToken };
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
    if (!user) {
        await signUp(name, naverId, profileImage, "naver", naverToken);
        user = await getUserBySocialId(naverId, "naver");
    }

    const { accessToken, refreshToken } = generateTokens(user.user_id);
    return { accessToken, refreshToken };
};

// auth.service.js
const refreshTokens = async (refreshToken) => {
    try {
        console.log("Received refresh token:", refreshToken);
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        const userId = decoded.id;
        console.log("Decoded userId:", userId);

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(userId);
        console.log("Generated access token:", accessToken);
        console.log("Generated new refresh token:", newRefreshToken);

        await updateRefreshToken(userId, newRefreshToken);
        console.log("Refresh token updated successfully");

        return { accessToken, newRefreshToken };
    } catch (error) {
        console.error("Error in refreshTokens:", error);
        throw new Error("Invalid or expired refresh token");
    }
};



export { kakaoLogin, naverLogin, refreshTokens };
