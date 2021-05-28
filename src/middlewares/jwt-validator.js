const jwt = require('jsonwebtoken');
const { User } = require('../db/models');
const { ApiError } = require('../error/api.error');

/**
 * Middleware para validar json web token
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const validateJWT = async (req, res, next) => {

    const token = req.header('x-auth-token');

    try {
        if (!token) {
           throw ApiError.unauthorized();
        }
    
        const { uuid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const user = await User.findOne({ where: { uuid } });

        if (!user) {
           throw new ApiError(401, 'You need to login again');
        }
        
        const userVerified = {
            logged: true,
            uuid: user.uuid,
            is_admin: user.is_admin
        }

        req.user_verified = userVerified;

        next();
        
    } catch (error) {
        next(error);
    }
}

module.exports = { validateJWT }