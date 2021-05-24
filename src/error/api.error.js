/**
 * Clase para error custom
 */
class ApiError extends Error {
    constructor(code, message) {
        super();
        this.code = code;
        this.message = message;
    }

    /**
     * Devuelve un nuevo objeto ApiError
     * @param {String} msg 
     * @returns {ApiError}
     */
    static badRequest(msg) {
        return new ApiError(400, msg);
    }

    /**
     * Devuelve un nuevo objeto ApiError
     * @returns {ApiError}
     */
    static unauthorized(){
        return new ApiError(401, 'Unauthorized');
    }

}

module.exports = { ApiError };