import { Request, Response, NextFunction } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';

const fieldValidator = (req: Request, res: Response, next: NextFunction): Response | void => {
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

export default fieldValidator;