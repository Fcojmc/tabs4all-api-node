const { ApiError } = require('../error/api.error');

/**
 * Middleware para verificar que un usuario esté logeado
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const loginVerifier = (req, res, next) => {

    if (!req.user_verified) {
       next(ApiError.badRequest(401, 'Token not verified.'));
    }

    next();
}

module.exports = { loginVerifier }