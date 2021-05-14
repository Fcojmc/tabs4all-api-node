const { Band } = require('../models');

exports.bandExists = async ( name = '' ) => {
    const bandExists = await Band.findOne( { where: { name } });

    if (bandExists) {
        throw new Error(`Band ${name} already exists.`);
    }
}


exports.bandExistsById = async (id) => {
    const bandExists = await Band.findByPk(id);

    if (!bandExists) {
        throw new Error(`There is no band with id: ${id}`);
    }
}