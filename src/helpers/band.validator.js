const { Band } = require('../db/models');

/**
 * Función validadora para express-validator
 * @param {String} name 
 */
const bandExists = async ( name = '' ) => {
    const bandExists = await Band.findOne( { where: { name } });

    if (bandExists) {
        throw new Error(`Band ${name} already exists.`);
    }
}

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

module.exports = { bandExists, bandExistsByUuid }