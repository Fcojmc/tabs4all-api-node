const { Band } = require('../models');

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
        return res.status(500).json(error);
    }
}


exports.updateBand = async (req, res) => {
    const { id } = req.params;
    const { body } = req.body;

    try {
        const band = await Band.findBypk(id);

        if (!band) {
            res.status(404).json({
                success: false,
                message: 'There is no band with such id.'
            });
        }

        await band.update(body);
        
        return res.json({
            success: true,
            message: `Band ${body.name} updated.`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

exports.deleteBand = async (req, res) => {
    const { id } = req.params;

    try {
        const band = await Band.findBypk(id);

        if (!band) {
            res.status(404).json({
                success: false,
                message: 'There is no band with such id.'
            });
        }

        await band.destroy();
        
        return res.json({
            success: true,
            message: `Band deleted!`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}