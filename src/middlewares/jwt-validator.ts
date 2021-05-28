import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import db from '../db/models';
import ApiError from '../error/api.error';
import { IUser } from '../interfaces/IUser';

export const validateJWT = async (req: any,
                                  res: Response,
                                  next: NextFunction): Promise<void> => {
    const token = req.header('x-auth-token') as string;
    const secret = process.env.SECREOTRPRIVATEKEY as string;
    try {
        if (!token) {
            throw ApiError.unauthorized();
        }

        const { uuid } = jwt.verify(token, secret) as {
            uuid: string
        };

        const user: IUser = await db.User.findOne({where: {uuid}});

        if (!user) {
            throw new ApiError(401, 'You need to login again');
        }

        const userVerified: Object = {
            logged: true,
            uuid: user.uuid,
            is_admin: user.is_admin
        }

        req.user_verified = userVerified;

        next();
    } catch (error) {
        next(error);
    }
}