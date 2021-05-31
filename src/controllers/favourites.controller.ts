import { Request, Response, NextFunction } from 'express'; 
import db from '../db/models';
import ApiError from '../error/api.error';
import { IUser } from '../interfaces/IUser';
import { IBand } from '../interfaces/IBand';

export const setFavouriteBands = async (req: Request,
                                        res: Response,
                                        next: NextFunction) => {
    const { UserId, BandId } = req.body;

    try {
        const user: IUser = await db.User.findOne({ where: { uuid: UserId } });
        const band: IBand = await db.Band.findOne({ where: { uuid: BandId } });

        if (!user || !band) {
            throw ApiError.badRequest(`There was a problem trying to add band to favourites`);
        }

        await db.UsersBands.create({
            UserId: user.id,
            BandId: band.id
        });

        return res.json({
            success: true,
            message: `You like ${band.name}!`
        });
    } catch (error) {
        next(error);
    }
}

export const unsetFavouriteBands = async (req: Request,
                                          res: Response,
                                          next: NextFunction) => {
    const { UserId, BandId } = req.body;

    try {
        const user: IUser = await db.User.findOne({ where: { uuid: UserId } });
        const band: IBand = await db.Band.findOne({ where: { uuid: BandId } });

        if (!user || !band) {
        throw ApiError.badRequest(`There was a problem trying to add band to favourites`);
        }

        await db.UsersBands.destroy({
            UserId: user.id,
            BandId: band.id
        });

        return res.json({
        success: true,
        message: `You don't like ${band.name}!`
        });
    } catch (error) {
        next(error);
    }
}

export const setFavouriteTabs = async (req: Request,
                                       res: Response,
                                       next: NextFunction) => {
    const { TabId, UserId } = req.body;
    
    try {
        const user = await db.User.findOne({ where: { uuid: UserId } });
        const tab = await db.Tab.findOne({ where: { uuid: TabId } });

        if (!user || !tab) {
            throw ApiError.badRequest(`There was a problem trying to add tab to favourites`);
        }

        await db.UserTabs.create({
            UserId: user.id,
            TabId: tab.id
        });

        return res.json({
            success: true,
            message: `You like tab ${tab.name}!`
        });
    } catch (error) {
        next(error);
    }
}

export const unsetFavouriteTabs = async (req: Request,
                                         res: Response,
                                         next: NextFunction) => {
    const { TabId, UserId } = req.body;

    try {
        const user = await db.User.findOne({ where: { uuid: UserId } });
        const tab = await db.Tab.findOne({ where: { uuid: TabId } });

        if (!user || !tab) {
            throw ApiError.badRequest(`There was a problem trying to add tab to favourites`);
        }

        await db.UserTabs.destroy({
            UserId: user.id,
            TabId: tab.id
        });

        return res.json({
            success: true,
            message: `You like tab ${tab.name}!`
        });
    } catch (error) {
        next(error);
    }
}
