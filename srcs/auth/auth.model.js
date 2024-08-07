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

const signUp = async (name, socialId, profileImage, provider, refreshToken) => {
    const [result] = await pool.query(
        `INSERT INTO User (
            nickname, status, phone_number, name, profile_image_url, social_provider, social_id, refresh_token, created_at, updated_at
        ) VALUES (NULL, 'active', NULL, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [name, profileImage, provider, socialId, refreshToken]
    );
    return result.insertId;
};

const updateRefreshToken = async (userId, refreshToken) => {
    try {
        const [result] = await pool.query(
            `UPDATE User SET refresh_token = ? WHERE user_id = ?`,
            [refreshToken, userId]
        );
        if (result.affectedRows === 0) {
            throw new Error("User not found or refresh token update failed");
        }
        console.log(`Updated refresh token for userId: ${userId}`);
    } catch (error) {
        console.error(`Failed to update refresh token for userId: ${userId}`, error);
        throw error; // Add throw here to propagate errors
    }
};




export { getUserBySocialId, signUp, updateRefreshToken };
