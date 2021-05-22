const { ApiError } = require('../error/api.error');

const isAdminRole = (req, res, next) => {

    if (!req.user_verified.is_admin) {
        next(ApiError.unauthorized());
        return;
    }

    next();
}

module.exports = { isAdminRole }