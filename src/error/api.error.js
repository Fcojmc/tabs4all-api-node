class ApiError extends Error {
    constructor(code, message) {
        super();
        this.code = code;
        this.message = message;
    }

    static badRequest(msg) {
        return new ApiError(400, msg);
    }

    static unauthorized(){
        return new ApiError(401, 'Unauthorized');
    }

}

module.exports = { ApiError };