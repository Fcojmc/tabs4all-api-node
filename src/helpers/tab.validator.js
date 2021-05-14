const { Tab } = require('../models');

exports.tabExists = async ( name = '' ) => {
    const tabExists = await Tab.findOne( { where: { name } } );

    if (tabExists) {
        throw new Error(`Tab ${name} already exists.`);
    }
}

exports.tabExistsById = async (id) => {
    const tabExists = await Tab.findByPk(id);

    if (!tabExists) {
        throw new Error('There is no tab with such id.');
    }
}