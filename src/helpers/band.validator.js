const { Band } = require('../db/models');

/**
 * Función validadora para express-validator
 * @param {String} uuid 
 */
const bandExistsByUuid = async (uuid) => {
    const bandExists = await Band.findOne( { where: { uuid: uuid } } );

    if (!bandExists) {
        throw new Error(`There is no band with id: ${id}`);
    }
}

module.exports = { bandExistsByUuid }