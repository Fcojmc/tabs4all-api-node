import { Response, NextFunction } from 'express';
import ApiError from '../error/api.error';

const loginVerifier = (req: any,
                              res: Response,
                              next: NextFunction): void => {
    if (!req.user_verified) {
        next(ApiError.badRequest('Token not verified'));
    }

    next();
}

export default loginVerifier;