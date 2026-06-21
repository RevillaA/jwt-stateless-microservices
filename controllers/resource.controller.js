export class ResourceController {
    static getAlphaPrivateData(req, res) {
        throw new Error('Conexion perdida con la BDD');
    }

    static getBetaPrivateData(req, res) {
        return res.status(200).json({
            message: 'Acceso autorizado al microservicio Beta.',
            user: req.user
        });
    }
}
