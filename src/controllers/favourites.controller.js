const { User, Band, Tab, UsersBands, UsersTabs } = require('../db/models');

exports.setFavouriteBands = async (req, res) => {

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
        console.log(error);
        throw new Error('Error trying to set favourite band.');
    }
}

exports.unsetFavouriteBands = async (req, res) => {
    
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
        console.log(error);
        throw new Error('Error trying to unset favourite band.');
    }
}

exports.setFavouriteTabs = async (req, res) => {

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
        console.log(error);
        throw new Error('Error trying to set favourite tab.');
    }
}

exports.unsetFavouriteTabs = async (req, res) => {

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
        console.log(error);
        throw new Error('Error trying to unset favourite tab.');
    }
}