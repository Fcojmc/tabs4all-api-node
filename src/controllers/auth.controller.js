const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { User } = require('../db/models');
const { ApiError } = require('../error/api.error');

exports.login = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            next(ApiError.badRequest(`Email does not match.`));
            return;
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            next(ApiError.badRequest('Password does not match.'));
            return;
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