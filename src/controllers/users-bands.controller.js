const { User, Band, UsersBands } = require('../db/models');


exports.setFavouriteBands = async (req, res) => {

    const { userUuid, bandUuid } = req.body;

    try {
        const user = await User.findOne({ where: { uuid: '9f8cf2b8-d4df-42a0-a53e-d90d1cdf7bd6' } });
        const band = await Band.findOne({ where: { uuid: '7406e20d-4e73-417c-9f71-4bcd692aca50' } });
       
        await user.addFavouriteBand(band);
        
        return res.json({
            success: true,
            message: `You like ${band.name}!`
        });
         
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
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
        throw new Error(error.message);
    }
}