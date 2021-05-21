const { Band } = require('../db/models');

exports.createBand = async (req, res) => {
    const { name, url_yt } = req.body;

    try {
        const band = await Band.create({name, url_yt});

        return res.json({
            success: true,
            message: `Band ${name} created.`,
        });
    } catch(error) {
        console.log(error);
        throw new Error('Error trying to create a band.');
    }
}

exports.deleteBand = async (req, res) => {
    const { uuid } = req.params;

    try {
        const band = await Band.findOne( { where: { uuid } } );


        await band.destroy();
        
        return res.json({
            success: true,
            message: `Band deleted!`
        });
    } catch (error) {
        console.log(error);
        throw new Error('Error trying to delete a band.');
    }
}

exports.getAllBands = async (req, res) => {

    try {
        const bands = await Band.findAll();
        
        return res.json({
            success: true,
            message: 'All bands.',
            data: bands
        });

    } catch (error) {
        console.log(error);
        throw new Error('Error trying to get all tabs.');
    }
}

exports.getBandById = async (req, res) => {
    const { uuid } = req.params

    try {
        const band = await Band.findOne( { where: { uuid }, include: 'songs' } );

        return res.json({
            success: true,
            message: 'Band found',
            data: band
        });
    } catch (error) {
        console.log(error);
        throw new Error('Error trying to get a single band.');
    }
}

exports.updateBand = async (req, res) => {
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
        console.log(error);
        throw new Error('Error trying to update a band.');
    }
}