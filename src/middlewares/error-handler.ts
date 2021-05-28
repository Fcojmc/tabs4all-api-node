import ApiError from '../error/api.error';
import { Request, Response, NextFunction } from 'express';

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): Response | undefined => {
    
    if (error instanceof ApiError) {
        res.status(error.code).json({
            message: error.message
        });

        return;
    }
    console.log(error)
    return res.status(500).json({
        error: {
            message: error.message
        }
    });
}

export default errorHandler;