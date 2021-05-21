
const loginVerifier = (req, res, next) => {

    if (!req.user_verified) {
        throw new Error('Token not verified');
    }

    next();
}

module.exports = { loginVerifier }