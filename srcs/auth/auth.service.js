// auth.service.js
import axios from "axios";
import jwt from "jsonwebtoken";
import { getUserBySocialId, signUp } from "./auth.model.js";

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

// 액세스 토큰과 리프레시 토큰을 생성
const generateTokens = (userId) => {
    const accessToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: userId }, JWT_REFRESH_SECRET, { expiresIn: "30d" });
    return { accessToken, refreshToken };
};

const kakaoLogin = async (kakaoToken) => {
    const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: { Authorization: `Bearer ${kakaoToken}` },
    });

    console.log('Kakao API Response:', result.data);

    const { data } = result;
    const { nickname: name, profile_image: profileImage } = data.properties;
    const email = data.kakao_account.email;
    const kakaoId = data.id;

    if (!name || !kakaoId) throw new Error("KEY_ERROR");

    let user = await getUserBySocialId(kakaoId, "kakao");
    if (!user) {
        await signUp(email, name, kakaoId, profileImage, "kakao", kakaoToken);
        user = await getUserBySocialId(kakaoId, "kakao");
    }

    const { accessToken, refreshToken } = generateTokens(user.user_id);
    return { accessToken, refreshToken };
};


const naverLogin = async (naverToken) => {
    const result = await axios.get("https://openapi.naver.com/v1/nid/me", {
        headers: { Authorization: `Bearer ${naverToken}` },
    });

    const { response } = result.data;
    const { name, email, id: naverId, profile_image: profileImage } = response;

    if (!name || !email || !naverId) throw new Error("KEY_ERROR");

    let user = await getUserBySocialId(naverId, "naver");
    if (!user) {
        await signUp(email, name, naverId, profileImage, "naver", naverToken);
        user = await getUserBySocialId(naverId, "naver");
    }

    const { accessToken, refreshToken } = generateTokens(user.user_id);
    return { accessToken, refreshToken };
};


export { kakaoLogin, naverLogin };
