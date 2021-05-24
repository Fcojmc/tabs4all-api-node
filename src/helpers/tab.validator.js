const { Tab } = require('../db/models');

/**
 * Función validadora para express-validator
 * @param {String} name 
 */
const tabExists = async ( name = '' ) => {
    const tabExists = await Tab.findOne( { where: { name } } );

    if (tabExists) {
        throw new Error(`Tab ${name} already exists.`);
    }
}

/**
 * Función validadora para express-validator
 * @param {String} uuid 
 */
const tabExistsByUuid = async (uuid) => {
    const tabExists = await Tab.findOne( { where: { uuid } } );
    
    if (!tabExists) {
        throw new Error('There is no tab with such id.');
    }
}

module.exports = { tabExists, tabExistsByUuid }