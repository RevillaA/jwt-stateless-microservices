import { JwtService } from '../services/jwt.service.js';

export const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({
            message: 'Token no proporcionado.'
        });
    }

    const parts = authorizationHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
        return res.status(400).json({
            message: 'Formato Bearer invalido.'
        });
    }

    const token = parts[1];

    try {
        const payload = JwtService.verifyToken(token);
        req.user = payload;
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token expirado.'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            if (error.message === 'jwt malformed') {
                return res.status(400).json({
                    message: 'Token malformado.'
                });
            }

            if (error.message === 'invalid signature') {
                return res.status(403).json({
                    message: 'Firma invalida.'
                });
            }

            if (error.message === 'invalid algorithm') {
                return res.status(400).json({
                    message: 'Algoritmo invalido.'
                });
            }

            return res.status(403).json({
                message: 'Token invalido.'
            });
        }

        return res.status(500).json({
            message: 'Error interno al validar el token.'
        });
    }
};
