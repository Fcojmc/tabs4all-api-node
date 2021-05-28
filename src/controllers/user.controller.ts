import bcryptjs from 'bcryptjs';
import db from '../db/models';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/api.error';

import { UploadedFile } from 'express-fileupload';
import { IUser } from '../interfaces/IUser';

export const registerUser = async (req: Request,
                                   res: Response,
                                   next: NextFunction): Promise<Response | undefined> => {

    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;

    try {
        const encryptedPassword: string = bcryptjs.hashSync(password, 10);

        const user: IUser = await db.User.create({name, email, password: encryptedPassword});

        return res.json({
            success: true,
            message: 'Account registered',
            data: user
        })
    } catch (error) {
        next(error);
    }

}

export const getUserInfo = async (req: Request,
                                  res: Response, 
                                  next: NextFunction): Promise<Response | undefined> => {

    const { uuid } = req.params;

    try {
        const user: IUser = await db.User.findOne({ where: { uuid } });
        
        return res.json({
            success: true,
            message: 'User info',
            data: user
        });
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req: Request,
                                 res: Response, 
                                 next: NextFunction): Promise<Response | undefined> => {
   
    const { uuid } = req.params;
    const userData: IUser = JSON.parse(req.body.data);

    try {
        const user: IUser = await db.User.findOne({ where: { uuid } });

        let imageName: string = user.image;

        if (req.files) {
            let image = req.files.image as UploadedFile;
            imageName = new Date().valueOf() + '_' + image.name;
            image.mv(path.join(__dirname, '../../public/user-images/', imageName), (error: Error) => {
                if (error) {
                    throw ApiError.badRequest('Error uploading image.');
                }
            }); 
        }

        await db.User.update(
            {name: userData.name, image: imageName},
            {where: { uuid }}
        );

        return res.json({
            success: true,
            message: 'User info updated succesfully'
        });
    } catch (error) {
        next(error);
    }
}