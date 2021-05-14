const cheerio = require('cheerio');
const requestPromise = require('request-promise');
const { Song } = require('../models');


exports.createSongs = async (req = request, res = response) => {
    const { bandId, name } = req.body;

    try {
        let bandName = encodeURIComponent(name) ;
        const bandUrl = `https://www.songsterr.com/?pattern=${bandName}`;
        
        const htmlResult = await requestPromise.get(bandUrl);
        const $ = await cheerio.load(htmlResult);

        $('.C052ub').children('.Beifj').each( async (index, element) => {
            const link = 'https://www.songsterr.com' + $(element).attr("href");
            const songName = $(element).children('.Bei2e1').children('.Beiqi').text();
            await Song.create({ name: songName, url: link, bandId });
        });
        
        return res.json({
            success: true,
            message: `Loaded songs for band ${req.body.name}`
        }); 

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
    
}
