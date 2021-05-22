const jwt = require('jsonwebtoken');
const { User } = require('../db/models');
const { ApiError } = require('../error/api.error');

const validateJWT = async (req, res, next) => {

    const token = req.header('x-auth-token');

    try {
        if (!token) {
           throw new ApiError(401, 'Unauthorized');
        }
    
        const { uuid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const user = await User.findOne({ where: { uuid } });

        if (!user) {
           throw new ApiError(401, 'Invalid token');
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