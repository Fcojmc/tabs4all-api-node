const { Band } = require('../db/models');
const { ApiError } = require('../error/api.error');

const bandNameCheck = async (req, res, next) => {
    const bandData = JSON.parse(req.body.data);

    try {
        const bandExists = await Band.findOne({ where: { name: bandData.name} });

        if (bandExists) {
            throw ApiError.badRequest(`Band ${bandExists.name} already exists.`)
        }

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = { bandNameCheck }