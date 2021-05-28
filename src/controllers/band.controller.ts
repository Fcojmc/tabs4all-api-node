import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import db from '../db/models';
import ApiError from '../error/api.error';
import { IBand } from '../interfaces/IBand';
import { UploadedFile } from 'express-fileupload';


export const createBand = async(req: Request,
                                res: Response,
                                next: NextFunction): Promise<Response | undefined> => {
    const bandData: IBand = JSON.parse(req.body.data);

    try {
        let imageName!: string;

        if (req.files) {
            let image = req.files.image as UploadedFile;
            imageName = new Date().valueOf() + '_' + image.name;
            image.mv(path.join(__dirname, '../../public/band-images/', imageName), (error: Error) => {
                if (error) {
                    throw ApiError.badRequest('Error uploading image');
                }
            });
        }

        await db.Band.create({
            name: bandData.name,
            image: imageName,
            url_yt: bandData.url_yt
        });

        return res.json({
            success: true,
            message: `Band ${bandData.name} created`,
            data: null
        });
    } catch (error) {
        next(error);
    }
}

export const deleteBand = async (req: Request,
                                 res: Response,
                                 next: NextFunction): Promise<Response | undefined> => {
    const { uuid } = req.params;

    try {
        await db.Band.destroy({ where: { uuid } });

        return res.json({
            success: true,
            message: 'Band deleted',
            data: null
        });
    } catch (error) {
        next(error);
    }
}

export const getAllBands = async (req: Request,
                                  res: Response,
                                  next: NextFunction): Promise<Response | undefined> => {
    try {
        const bands: IBand[] = await db.Band.findAll();

        return res.json({
            success: true,
            message: 'All bands',
            data: bands
        });
    } catch (error) {
        next(error);
    }
}

export const getBandById = async (req: Request,
                                  res: Response,
                                  next: NextFunction): Promise<Response | undefined> => {
    const { uuid } = req.params;

    try {
        const band: IBand = await db.Band.findOne({ where: { uuid } });

        return res.json({
            success: true,
            message: 'Band found',
            data: band
        });
    } catch (error) {
        next(error);
    }
}

export const updateBand = async (req: Request,
                                 res: Response,
                                 next: NextFunction): Promise<Response | undefined> => {
    const { uuid } = req.params;
    const bandData: IBand = JSON.parse(req.body.data);

    try {
        const band: IBand = db.Band.findOne({ where: { uuid} });
        let bandImage: string = band.image;

        if (req.files) {
            const imagePath: string = path.join(__dirname, '../../public/band-images/', bandImage);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            let image = req.files.image as UploadedFile;
            bandImage = new Date().valueOf() + '_' + image.name;
            const newImagePath: string = path.join(__dirname, '../../public/band-images/', bandImage);
            image.mv(newImagePath, (error: Error) => {
                if (error) {
                    throw ApiError.badRequest('Error uploading image.');
                }
            });
        }

        await db.Band.update(
            {name: bandData.name, url_yt: bandData.url_yt, image: bandImage},
            {where: {uuid}}
        );
        
        return res.json({
            success: true,
            message: `Band ${bandData.name} updated.`
        });
    } catch (error) {
        next(error);
    }
}