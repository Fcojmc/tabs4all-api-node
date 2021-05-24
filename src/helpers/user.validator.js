const { User } = require('../db/models');
/**
 * Función validadora para express-validator
 * @param {String} email 
 */
const emailExists = async ( email = '') => {
     const emailExists = await User.findOne({ where: { email } });

     if (emailExists) {
         throw new Error(`Email: '${email}' already exists.`);
     }
}

/**
 * Función validadora para express-validator
 * @param {String} uuid 
 */
const userExists = async (uuid) => {
    const userExists = await User.findOne( { where: { uuid } } );

    if (!userExists) {
        throw new Error(`There is no user with uuid: ${uuid}`);
    }
}

module.exports = { emailExists, userExists }