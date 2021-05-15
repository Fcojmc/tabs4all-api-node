const cheerio = require('cheerio');
const requestPromise = require('request-promise');
const { Song, Band } = require('../db/models');


exports.createSongs = async (req, res) => {
    const { uuid  } = req.params;

    try {
        const band = await Band.findOne({ where: { uuid } });
        const bandName = encodeURIComponent(band.name);
        const bandUrl = `https://www.songsterr.com/?pattern=${bandName}`;
        
        const htmlResult = await requestPromise.get(bandUrl);
        const $ = await cheerio.load(htmlResult);

        $('.C052ub').children('.Beifj').each( async (index, element) => {
            const link = 'https://www.songsterr.com' + $(element).attr("href");
            const songName = $(element).children('.Bei2e1').children('.Beiqi').text();
            await Song.create({ name: songName, url: link, bandId: band.id });
        });
        
        return res.json({
            success: true,
            message: `Loaded songs for band ${band.name}`
        }); 

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
    
}
