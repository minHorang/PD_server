import { pool } from '../../config/db.js'; 

// 사용자 정보를 저장하거나 업데이트합니다.
export const saveUser = async (userInfo) => {
    const { id, email, provider } = userInfo;
    const query = `
        INSERT INTO users (id, email, provider)
        VALUES ($1, $2, $3)
        ON CONFLICT (id) 
        DO UPDATE SET email = EXCLUDED.email, provider = EXCLUDED.provider
        RETURNING *;
    `;
    const values = [id, email, provider];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// 사용자 ID로 사용자 정보를 조회합니다.
export const getUserById = async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
};
