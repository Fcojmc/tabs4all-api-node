import cheerio from 'cheerio';
import requestPromise from 'request-promise';
import db from '../db/models';
import { Request, Response, NextFunction } from 'express';
import { IBand } from '../interfaces/IBand';

export const songScraper = async (req: Request,
                                  res: Response,
                                  next: NextFunction) => {
    const { uuid } = req.params;

    try {
        const band: IBand = await db.Band.findOne({ where: {uuid}});
        const bandName: string = encodeURIComponent(band.name);
        const bandUrl: string = `https://www.songsterr.com/?pattern=${bandName}`;

        const htmlResult: any = await requestPromise.get(bandUrl);
        const $: any  = await cheerio.load(htmlResult);

        $('.C052ub').children('.Beifj').each( async (index: any, element: any) => {
            const link: string = 'https://www.songsterr.com' + $(element).attr("href");
            const songName: string = $(element).children('.Bei2e1').children('.Beiqi').text();
            await db.Song.create({ name: songName, url: link, bandId: band.id });
        });

        return res.json({
            success: true,
            message: `Loaded songs for band ${band.name}`
        });
    } catch (error) {
        next(error);
    }
}