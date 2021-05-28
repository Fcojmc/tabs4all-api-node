const { ApiError } = require('../error/api.error'); 

/**
 * Middleware que maneja todos los errores
 * @param {Error} error 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response.json}
 */
const apiErrorHandler = (error, req, res, next) => {

    if (error instanceof ApiError) {
        res.status(error.code).json({
            message: error.message
        });

        return;
    }

    res.status(500).json({
        message: error.message
    });
}

module.exports = { apiErrorHandler };