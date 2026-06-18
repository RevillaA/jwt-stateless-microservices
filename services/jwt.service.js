import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export class JwtService {
    /**
     * Firma un token JWT con los claims estandares requeridos.
     * @param {Object} user - Datos del usuario.
     * @returns {string}
     */
    static signToken(user) {
        const nowInSeconds = Math.floor(Date.now() / 1000);
        const payload = {
            sub: String(user.id),
            name: user.name,
            exp: nowInSeconds + 60
        };

        if (config.PRIVATE_KEY) {
            return jwt.sign(payload, config.PRIVATE_KEY, {
                algorithm: 'RS256',
                noTimestamp: true
            });
        }

        return jwt.sign(payload, config.JWT_SECRET, {
            algorithm: 'HS256',
            noTimestamp: true
        });
    }

    /**
     * Verifica un token JWT usando el metodo oficial de jsonwebtoken.
     * @param {string} token
     * @returns {Object}
     */
    static verifyToken(token) {
        if (config.PUBLIC_KEY) {
            return jwt.verify(token, config.PUBLIC_KEY, {
                algorithms: ['RS256']
            });
        }

        return jwt.verify(token, config.JWT_SECRET, {
            algorithms: ['HS256']
        });
    }
}
