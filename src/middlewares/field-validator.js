const { validationResult } = require('express-validator');

/**
 * Función que devuelve todos los errores de express-validator
 * registrado en los helpers o en el check, en caso de que los haya
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next
 */
const fieldValidator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

module.exports = { fieldValidator }