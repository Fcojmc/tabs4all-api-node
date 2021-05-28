import { Request, Response, NextFunction} from 'express';
import db from '../db/models';
import ApiError from '../error/api.error';
import { IBand } from '../interfaces/IBand';

const bandNameCheck = async (req: Request,
                                    res: Response,
                                    next: NextFunction): Promise<void> => {
    const bandData: IBand = JSON.parse(req.body.data);
    
    try {
        const bandExists: IBand = await db.Band.findOne({ where: { name: bandData.name } });

        if (bandExists) {
            throw ApiError.badRequest(`Band ${bandExists.name} alrady exists`);
        }

        next();
    } catch (error) {
        next(error);
    }
}

export default bandNameCheck;