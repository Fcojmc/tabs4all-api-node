const { ApiError } = require('../error/api.error'); 

const apiErrorHandler = (error, req, res, next) => {

    if (error instanceof ApiError) {
        res.status(error.code).json({
            error: {
                message: error.message
            }
        });
        console.log(error);
        return;
    }
    console.log(error);
    res.status(500).json({
        error: {
            message: 'Something went wrong, contact administrator.'
        }
    });
}

module.exports = { apiErrorHandler };