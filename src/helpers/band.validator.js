const { Band } = require('../db/models');

exports.bandExists = async ( name = '' ) => {
    const bandExists = await Band.findOne( { where: { name } });

    if (bandExists) {
        throw new Error(`Band ${name} already exists.`);
    }
}

exports.bandExistsByUuid = async (uuid) => {
    const bandExists = await Band.findOne( { where: { uuid: uuid } } );

    if (!bandExists) {
        throw new Error(`There is no band with id: ${id}`);
    }
}