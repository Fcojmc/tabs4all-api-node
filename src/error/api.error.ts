class ApiError extends Error {
    public code: number;
    public message: string;

    constructor(code: number, message: string){
        super();
        this.code = code;
        this.message = message;
    }

    static badRequest(message: string): ApiError {
        return new ApiError(400, message);
    }

    static unauthorized(): ApiError {
        return new ApiError(401, 'Unauthorized');
    }
}

export default ApiError;