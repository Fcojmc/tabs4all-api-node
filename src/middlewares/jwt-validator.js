const jwt = require('jsonwebtoken');
const { User } = require('../db/models');

const validateJWT = async (req, res, next) => {

    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }

    try {
        const { uuid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const user = await User.findOne({ where: { uuid } });

        if (!user) {
           return res.status(401).json({
               success: false,
               message: 'Invalid token'
           });
        }
        
        const userVerified = {
            logged: true,
            uuid: user.uuid,
            is_admin: user.is_admin
        }

        req.user_verified = userVerified;

        next();
        
    } catch (error) {
        console.log(error);
        throw new Error('Invalid auth');
    }
}

module.exports = { validateJWT }