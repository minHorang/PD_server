import jwt from 'jsonwebtoken';
import { response } from '../../config/response.js'; // 응답 형식 지정
const { JWT_SECRET } = process.env;

// 액세스 토큰 검증 미들웨어
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    // Authorization 헤더가 없거나 Bearer 토큰 형식이 아닌 경우
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json(
            response(
                { isSuccess: false, code: 401, message: 'Authorization 헤더가 없거나 형식이 잘못되었습니다' },
                {}
            )
        );
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                // 토큰 만료
                return res.status(401).json(
                    response(
                        { isSuccess: false, code: 401, message: '토큰이 만료되었습니다' },
                        {}
                    )
                );
            }
            // 유효하지 않은 토큰
            return res.status(401).json(
                response(
                    { isSuccess: false, code: 401, message: '유효하지 않은 토큰입니다' },
                    {}
                )
            );
        }

        req.userId = decoded.id; // 유저 ID를 요청 객체에 추가
        next(); // 다음 미들웨어로 진행
    });
};

export default authenticateToken;
