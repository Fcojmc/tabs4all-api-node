
const isAdminRole = (req, res, next) => {

    if (!req.user_verified.is_admin) {
        throw new Error('Not admin');
    }

    next();
}

module.exports = { isAdminRole }