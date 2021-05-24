const { ApiError } = require('../error/api.error');

/**
 * Middleware para verificar si el usuario es administrador
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const isAdminRole = (req, res, next) => {

    if (!req.user_verified.is_admin) {
        next(ApiError.unauthorized());
    }

    next();
}

module.exports = { isAdminRole }