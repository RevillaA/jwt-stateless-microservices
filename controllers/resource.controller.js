export class ResourceController {
    static getAlphaPrivateData(req, res) {
        return res.status(200).json({
            message: 'Acceso autorizado al microservicio Alpha.',
            user: req.user
        });
    }

    static getBetaPrivateData(req, res) {
        return res.status(200).json({
            message: 'Acceso autorizado al microservicio Beta.',
            user: req.user
        });
    }
}
