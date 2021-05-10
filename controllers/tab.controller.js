const { Tab, User } = require('../models');

/**
 * Método para crear tablaturas
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Response.json}
 */
exports.createTab = async (req, res) => {
    const { name, content, url_yt, userId } = req.body;

    try {
        const tab = await Tab.create({ name, content, url_yt, userId });

        return res.json({
            success: true,
            message: 'Tab created',
            data: tab
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
            error
        });
    }
}

/**
 * Método para obtener los datos de todas las tablaturas
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Response.json}
 */
exports.getAllTabs = async (req, res) => {

    try {
        const tabs = await Tab.findAll({ include: 'user' });

        return res.json({
            success: true,
            message: 'All tabs',
            data: tabs
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
            error
        });
    }
}