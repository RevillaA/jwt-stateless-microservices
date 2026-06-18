export class ResourceController {
    /**
     * Simula un recurso privado del Microservicio Alpha.
     */
    static getAlphaPrivateData(req, res) {
        return res.status(200).json({
            message: 'Acceso autorizado al microservicio Alpha.',
            user: req.user
        });
    }

    /**
     * Simula un recurso privado del Microservicio Beta.
     */
    static getBetaPrivateData(req, res) {
        return res.status(200).json({
            message: 'Acceso autorizado al microservicio Beta.',
            user: req.user
        });
    }
}
