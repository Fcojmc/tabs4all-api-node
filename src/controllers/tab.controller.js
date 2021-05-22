const { next } = require('cheerio/lib/api/traversing');
const { Tab, User } = require('../db/models');

exports.createTab = async (req, res, next) => {
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
        next(error);
    }
}

exports.deleteTab =  async (req, res, next) => {
    
    const { uuid } = req.params;

    try {
        const tab = await Tab.findOne( { where: { uuid } } );

        await tab.destroy();
        
        return res.json({
            success: true,
            message: 'Tab deleted successfully.'
        });

    } catch (error) {
        next(error);
    }
}

exports.getAllTabs = async (req, res, next) => {

    try {
        const tabs = await Tab.findAll({ include: 'user' });

        return res.json({
            success: true,
            message: 'All tabs',
            data: tabs
        });

    } catch (error) {
        next(error);
    }
}


exports.getTabById = async (req, res, next) => {
    
    const { uuid } = req.params;

    try {
        const tab = Tab.findOne( { where: { uuid } } );

        return res.json({
            success: true,
            message: 'Tab data.',
            data: tab
        });
    } catch (error) {
        next(error);
    }
}


exports.updateTab = async (req, res, next) => {

    const { uuid } = req.params;
    const { name, content, url_yt } = req.body;

    try {
        const tab = await Tab.findOne( { where: { uuid } } );

        await tab.update({ name, content, url_yt });

        return res.json({
            success: true,
            message: 'Tab updated succesfully.',
        });

    } catch (error) {
        next(error);
    }
}