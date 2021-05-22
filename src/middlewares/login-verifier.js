const { ApiError } = require('../error/api.error');

const loginVerifier = (req, res, next) => {

    if (!req.user_verified) {
       next(ApiError.badRequest(401, 'Token not verified.'));
       return;
    }

    next();
}

module.exports = { loginVerifier }