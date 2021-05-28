const { User, Band, Tab, UsersBands, UsersTabs } = require('../db/models');
const { ApiError } = require('../error/api.error');
 
exports.setFavouriteBands = async (req, res, next) => {

    const { UserId, BandId } = req.body;

    try {
        const user = await User.findOne({ where: { uuid: UserId } });
        const band = await Band.findOne({ where: { uuid: BandId } });
      
        if (!user || !band) {
            throw ApiError.badRequest(`There was a problem trying to add band to favourites`);
        }
        
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
    
    const { UserId, BandId } = req.body;
    
    try {
        const user = await User.findOne({ where: { uuid: UserId } });
        const band = await Band.findOne({ where: { uuid: BandId } });

        if (!user || !band) {
            throw ApiError.badRequest(`There was a problem trying to delete band from favourites`);
        }

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

    const { TabId, UserId } = req.body;
    console.log(req.body)
    try {
        const user = await User.findOne({ where: { uuid: UserId } });
        const tab = await Tab.findOne({ where: { uuid: TabId } });

        if (!user || !tab) {
            throw ApiError.badRequest(`There was a problem trying to add tab to favourites`);
        }

        await user.addFavouriteTab(tab);

        return res.json({
            success: true,
            message: `You like tab ${tab.name}!`
        });

    } catch (error) {
        next(error);
    }
}

exports.unsetFavouriteTabs = async (req, res, next) => {

    const { TabId, UserId } = req.body;

    try {
        const user = await User.findOne({ where: { uuid: UserId } });
        const tab = await Tab.findOne({where: { uuid: TabId } });

        if (!user || !tab) {
            throw ApiError.badRequest(`There was a problem trying to delete tab from favourites`);
        }

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