const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { User } = require('../db/models');
const { ApiError } = require('../error/api.error');

/**
 * Controlador para login
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response.json}
 */
exports.login = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw ApiError.badRequest('Invalid credentials.');
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            throw ApiError.badRequest('Invalid credentials.');
        }

        const token = await generateJWT( user.uuid );

        return res.json({
            success: true,
            message: 'Login succesful',
            data: token
        });
    } catch (error) {
        next(error);   
    }
}

exports.authCheck = (req, res, next) => {
    try {
        if (!req.user_verified) {
            res.status(400).send(false);
        }

        if(req.user_verified) {
            res.send(true);
        }
        
    } catch (error) {
        next(error);
    }
}

exports.adminCheck = (req, res, next) => {
    try {
        if(req.user_verified.is_admin){
            res.send(true);
        }
    } catch (error) {
        next(error);
    }
}