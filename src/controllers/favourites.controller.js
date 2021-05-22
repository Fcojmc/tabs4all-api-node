const { next } = require('cheerio/lib/api/traversing');
const { User, Band, Tab, UsersBands, UsersTabs } = require('../db/models');

exports.setFavouriteBands = async (req, res, next) => {

    const { userUuid, bandUuid } = req.body;

    try {
        const user = await User.findOne({ where: { uuid: userUuid } });
        const band = await Band.findOne({ where: { uuid: bandUuid } });
       
        await user.addFavouriteBand(band);
        
        return res.json({
            success: true,
            message: `You like ${band.name}!`
        });
         
    } catch (error) {
        next(error);
    }
}

exports.unsetFavouriteBands = async (req, res, next) => {
    
    const { userUuid, bandUuid } = req.body;
    
    try {
        const user = await User.findOne({ where: { uuid: userUuid } });
        const band = await Band.findOne({ where: { uuid: bandUuid } });

        await UsersBands.destroy({
            where: {
                BandId: band.id,
                UserId: user.id
            }
        });

        return res.json({
            success: true,
            message: `You don't like ${band.name} anymore`
        });
    
    } catch (error) {
        next(error);
    }
}

exports.setFavouriteTabs = async (req, res, next) => {

    const { userUuid, tabUuid } = req.body;

    try {
        const user = await User.findOne({ where: { uuid: userUuid } });
        const tab = await Tab.findOne({ where: { uuid: tabUuid } });

        await User.addFavouriteTab(tab);

        return res.json({
            success: true,
            message: `You like tab '${tab.name}'!`
        });

    } catch (error) {
        next(error);
    }
}

exports.unsetFavouriteTabs = async (req, res, next) => {

    const { userUuid, tabUuid } = req.body;

    try {
        const user = await User.findOne({ where: { uuid: userUuid } });
        const tab = await Tab.findOne({where: { uuid: tabUuid } });

        await UsersTabs.destroy({
            where: {
                TabId: tab.id,
                UserId: user.id
            }
        });

        return res.json({
            success: true,
            message: `You don't like tab ${tab.name} anymore.`
        });
        
    } catch (error) {
        next(error);
    }
}