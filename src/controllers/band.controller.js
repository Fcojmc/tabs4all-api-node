const { Band } = require('../db/models');

/**
 * Método para crear grupos.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response.json}
 */
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

/**
 * Método para borrar grupos.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response.json}
 */
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

/**
 * Método para obtener datos de todos los grupos
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response.json}
 */
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

/**
 * Método para obtener datos de un grupo por uuid
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response.json}
 */
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

/**
 * Método para actualizar un grupo
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response.json}
 */
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