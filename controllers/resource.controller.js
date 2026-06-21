import { Sentry } from '../src/instrument.js';

export class ResourceController {
    static getAlphaPrivateData(req, res) {
        throw new Error('Conexion perdida con la BDD');
    }

    static getBetaPrivateData(req, res) {
        try {
            if (req.query.simulateError === 'true') {
                throw new Error('Fallo interno simulado en service-beta');
            }

            return res.status(200).json({
                message: 'Acceso autorizado al microservicio Beta.',
                user: req.user
            });
        } catch (error) {
            Sentry.withScope((scope) => {
                scope.setTag('service', 'beta');
                scope.setTag('endpoint', '/v1/service-beta/private');
                scope.setTag('error_type', 'operational');
                scope.setTag('user_id', req.user?.sub || 'unknown');
                scope.setContext('auth_user', {
                    id: req.user?.sub || null,
                    name: req.user?.name || null
                });
                scope.setContext('request', {
                    method: req.method,
                    route: req.originalUrl
                });
                Sentry.captureException(error);
            });

            return res.status(500).json({
                message: 'Error interno en el microservicio Beta.'
            });
        }
    }
}
