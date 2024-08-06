// auth.model.js
import { pool } from "../../config/db.js";

const getUserBySocialId = async (socialId, provider) => {
    const [rows] = await pool.query(
        `SELECT user_id, nickname, status, phone_number, name, profile_image_url, social_provider, social_id, refresh_token
         FROM User
         WHERE social_id = ? AND social_provider = ?`, 
        [socialId, provider]
    );
    return rows[0];
};

const signUp = async (email, name, socialId, profileImage, provider, refreshToken) => {
    const [result] = await pool.query(
        `INSERT INTO User (
            nickname, status, phone_number, name, profile_image_url, social_provider, social_id, refresh_token, created_at, updated_at
        ) VALUES (?, 'active', NULL, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [name, email, profileImage, provider, socialId, refreshToken]
    );
    return result.insertId;
};


// 리프레시 토큰 업데이트
const updateRefreshToken = async (userId, refreshToken) => {
    await pool.query(
        `UPDATE users SET refresh_token = ? WHERE user_id = ?`,
        [refreshToken, userId]
    );
};

export { getUserBySocialId, signUp, updateRefreshToken };
