const fs = require('fs');
const path = require('path');
const { Band } = require('../db/models');
const { ApiError } = require('../error/api.error');

/**
 * Método para crear grupos.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response.json}
 */
exports.createBand = async (req, res, next) => {
    const bandData = JSON.parse(req.body.data);

    try {
        let imageName;

        if (req.files) {
            let image = req.files.image;
            imageName = new Date().valueOf() + '_' + image.name;
            image.mv(path.join(__dirname, '../../public/band-images/', imageName), (error) => {
                if (error) {
                    throw ApiError.badRequest('Error uploading image.');
                }
            });
        } 

        await Band.create({
            name: bandData.name,
            image: imageName,
            url_yt: bandData.url_yt
        });

        return res.json({
            success: true,
            message: `Band ${bandData.name} created.`,
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
    const bandData = JSON.parse(req.body.data);

    try {
        const band = await Band.findOne( { where: { uuid } } );

        let bandImage = band.image;
            
        if (req.files) {
            const imagePath = path.join(__dirname, '../../public/band-images/', bandImage);

            if(fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
            
            let image = req.files.image;
            bandImage = new Date().valueOf() + '_' + image.name;
            const newImagePath = path.join(__dirname, '../../public/band-images/', bandImage);
            image.mv(newImagePath, (error) => {
                if (error) {
                    throw ApiError.badRequest('Error uploading image.');
                }
            });
        } 

        await band.update({
            name: bandData.name,
            image: bandImage,
            url_yt: bandData.url_yt
        });
        
        return res.json({
            success: true,
            message: `Band ${bandData.name} updated.`
        });
    } catch (error) {
       next(error);
    }
}