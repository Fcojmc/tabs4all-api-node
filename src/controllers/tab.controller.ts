import { Request, Response, NextFunction } from 'express';
import db from '../db/models';
import { ITab } from '../interfaces/ITab';


export const createTab = async (req: Request, 
                                res: Response, 
                                next: NextFunction): Promise<Response | undefined> => {

    const name: string = req.body.name;
    const content: string = req.body.content;
    const url_yt: string = req.body.url_yt;
        
    try {
        const tab: ITab = await db.Tab.create({ name, content, url_yt});

        return res.json({
            success: true,
            message: 'Tab created',
            data: tab
        });    
    } catch (error) {
        next(error);
    }
}

export const deleteTab = async (req: Request, 
                                res: Response, 
                                next: NextFunction): Promise<Response | undefined> => {
                            
    const { uuid } = req.params;

    try {
        await db.Tab.destroy({ where: { uuid } });

        return res.json({
            success: true,
            message: 'Tab deleted',
            data: null
        })
    } catch (error) {
        next(error);
    }
}

export const getAllTabs = async (req: Request,
                                 res: Response,
                                 next: NextFunction): Promise<Response | undefined> => {
    try {
        const tabs: ITab[] = db.Tab.findAll();

        return res.json({
            success: true,
            message: 'All Tabs',
            data: tabs
        });
    } catch (error) {
        next(error);
    }
}

export const getTabById = async (req: Request,
                                 res: Response,
                                 next: NextFunction): Promise<Response | undefined> => {
    const { uuid } = req.params;
    
    try {
        const tab: ITab = await db.Tab.findOne({where : { uuid }});
        
        return res.json({
            success: true,
            messsage: 'Tab data',
            data: tab
        });
    } catch (error) {
        next(error);
    }
}

export const updateTab = async (req: Request,
                                res: Response,
                                next: NextFunction): Promise<Response | undefined> => {
    const { uuid } = req.params;
    const name: string = req.body.name;
    const content: string = req.body.content;
    const url_yt: string = req.body.url_yt;

    try {
        await db.Tab.update(
            {name, content, url_yt},
            {where: { uuid }}
        );

        return res.json({
            success: true,
            message: 'Tab updated',
            data: null
        });
    } catch (error) {
        next(error);
    }
}