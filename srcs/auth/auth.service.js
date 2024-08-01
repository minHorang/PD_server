// auth.service.js

import axios from 'axios';
import jwt from 'jsonwebtoken';
import redis from 'redis';
import { saveUser } from './auth.model.js';

const client = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });
const { JWT_SECRET, KAKAO_CLIENT_ID, KAKAO_CLIENT_SECRET, NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, OAUTH_STATE } = process.env;

client.on('error', (err) => {
    console.error('Redis error:', err);
});

export const getKakaoTokens = async (code, state) => {
    if (state !== OAUTH_STATE) {
        throw new Error('Invalid state parameter');
    }
    const response = await axios.post('https://kauth.kakao.com/oauth/token', null, {
        params: {
            grant_type: 'authorization_code',
            client_id: KAKAO_CLIENT_ID,
            client_secret: KAKAO_CLIENT_SECRET,
            redirect_uri: 'http://localhost:3000/auth/kakao/callback',
            code,
            state
        }
    });
    return response.data;
};

export const getKakaoUserInfo = async (accessToken) => {
    const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.data;
};

export const getNaverTokens = async (code, state) => {
    if (state !== OAUTH_STATE) {
        throw new Error('Invalid state parameter');
    }
    const response = await axios.post('https://nid.naver.com/oauth2.0/token', null, {
        params: {
            grant_type: 'authorization_code',
            client_id: NAVER_CLIENT_ID,
            client_secret: NAVER_CLIENT_SECRET,
            code,
            state
        }
    });
    return response.data;
};

export const getNaverUserInfo = async (accessToken) => {
    const response = await axios.get('https://openapi.naver.com/v1/nid/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.data.response;
};

export const generateJwtToken = async (userInfo) => {
    const payload = { id: userInfo.id, email: userInfo.email };
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    
    await saveUser(userInfo);
    
    await new Promise((resolve, reject) => {
        client.set(`refreshToken:${userInfo.id}`, refreshToken, 'EX', 7 * 24 * 60 * 60, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
    
    return { accessToken, refreshToken };
};

export const refreshJwtToken = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, JWT_SECRET);
        const storedToken = await new Promise((resolve, reject) => {
            client.get(`refreshToken:${decoded.id}`, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
        if (storedToken !== refreshToken) throw new Error('Invalid refresh token');
        const newAccessToken = jwt.sign({ id: decoded.id, email: decoded.email }, JWT_SECRET, { expiresIn: '1h' });
        return newAccessToken;
    } catch (error) {
        throw new Error('Failed to refresh token: ' + error.message);
    }
};

export const invalidateRefreshToken = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, JWT_SECRET);
        await new Promise((resolve, reject) => {
            client.del(`refreshToken:${decoded.id}`, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    } catch (error) {
        throw new Error('Failed to invalidate token: ' + error.message);
    }
};
