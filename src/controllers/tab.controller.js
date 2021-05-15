const { Tab, User } = require('../db/models');

/**
 * Método para crear tablaturas
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Response.json}
 */
exports.createTab = async (req, res) => {
    const { name, content, url_yt, userUuid } = req.body;

    try {
        const user = await User.findOne( { where: { uuid: userUuid } } );

        const tab = await Tab.create({ name, content, url_yt, userId: user.id });

        return res.json({
            success: true,
            message: 'Tab created',
            data: tab
        });

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
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
        throw new Error(error.message);
    }
}


exports.getTabById = async (req, res) => {
    
    const { uuid } = req.params;

    try {
        const tab = Tab.findOne( { where: { uuid } } );

        return res.json({
            success: true,
            message: 'Tab data.',
            data: tab
        });
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}


exports.updateTab = async (req, res) => {

    const { uuid } = req.params;
    const { name, content, url_yt } = req.body;

    try {
        const tab = await Tab.findOne( { where: { uuid } } );

        await tab.update(name, content, url_yt);

        return res.json({
            success: true,
            message: 'Tab updated succesfully.',
        });

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

exports.deleteTab =  async (req, res) => {
    
    const { uuid } = req.params;

    try {
        const tab = await Tab.findOne( { where: { uuid } } );

        await tab.destroy();
        
        return res.json({
            success: true,
            message: 'Tab deleted successfully.'
        });

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}