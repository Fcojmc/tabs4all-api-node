import { Response, NextFunction } from 'express';
import ApiError from '../error/api.error';

const isAdminRole = (req: any,
                     res: Response,
                     next: NextFunction): void => {
    if (!req.user_verified.is_admin) {
        next(ApiError.unauthorized());
    }

    next();
}

export default isAdminRole;