import { JwtService } from '../services/jwt.service.js';

export const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({
            message: 'Token no proporcionado.'
        });
    }

    const [scheme, token] = authorizationHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(400).json({
            message: 'Formato de autorizacion invalido.'
        });
    }

    try {
        const payload = JwtService.verifyToken(token);
        req.user = payload;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token expirado.'
            });
        }

        return res.status(403).json({
            message: 'Token invalido.'
        });
    }
};
