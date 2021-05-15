const { Tab } = require('../db/models');

exports.tabExists = async ( name = '' ) => {
    const tabExists = await Tab.findOne( { where: { name } } );

    if (tabExists) {
        throw new Error(`Tab ${name} already exists.`);
    }
}

exports.tabExistsByUuid = async (uuid) => {
    const tabExists = await Tab.findOne( { where: { uuid } } );
    
    if (!tabExists) {
        throw new Error('There is no tab with such id.');
    }
}