import { JwtService } from '../services/jwt.service.js';

export class AuthController {
    /**
     * Genera un token para autenticacion simulada.
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {Promise<void>}
     */
    static async generateToken(req, res) {
        const { username, password } = req.body;

        if (username !== 'admin' || password !== 'admin123') {
            return res.status(401).json({
                message: 'Credenciales invalidas.'
            });
        }

        const user = {
            id: '1',
            name: 'Administrador'
        };

        const token = JwtService.signToken(user);

        return res.status(200).json({
            message: 'Token generado exitosamente.',
            token
        });
    }
}
