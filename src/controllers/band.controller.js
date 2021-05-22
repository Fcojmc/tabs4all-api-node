const { Band } = require('../db/models');

exports.createBand = async (req, res, next) => {
    const { name, url_yt } = req.body;

    try {
        await Band.create({name, url_yt});

        return res.json({
            success: true,
            message: `Band ${name} created.`,
        });
    } catch(error) {
        next(error);
    }
}

exports.deleteBand = async (req, res, next) => {
    const { uuid } = req.params;

    try {
        const band = await Band.findOne( { where: { uuid } } );

        await band.destroy();
        
        return res.json({
            success: true,
            message: `Band deleted!`
        });
    } catch (error) {
        next(error);
    }
}

exports.getAllBands = async (req, res, next) => {

    try {
        const bands = await Band.findAll();
        
        return res.json({
            success: true,
            message: 'All bands.',
            data: bands
        });

    } catch (error) {
        next(error);
    }
}

exports.getBandById = async (req, res, next) => {
    const { uuid } = req.params

    try {
        const band = await Band.findOne( { where: { uuid }, include: 'songs' } );

        return res.json({
            success: true,
            message: 'Band found',
            data: band
        });
    } catch (error) {
        next(error);
    }
}

exports.updateBand = async (req, res, next) => {
    const { uuid } = req.params;
    const { name, url_yt } = req.body;

    try {
        const band = await Band.findOne( { where: { uuid } } );

        await band.update({name, url_yt});
        
        return res.json({
            success: true,
            message: `Band ${name} updated.`
        });
        
    } catch (error) {
       next(error);
    }
}