const { Tab } = require('../db/models');

const tabExists = async ( name = '' ) => {
    const tabExists = await Tab.findOne( { where: { name } } );

    if (tabExists) {
        throw new Error(`Tab ${name} already exists.`);
    }
}

const tabExistsByUuid = async (uuid) => {
    const tabExists = await Tab.findOne( { where: { uuid } } );
    
    if (!tabExists) {
        throw new Error('There is no tab with such id.');
    }
}

module.exports = { tabExists, tabExistsByUuid }