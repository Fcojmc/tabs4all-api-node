const { User } = require('../db/models');


const emailExists = async ( email = '') => {
     const emailExists = await User.findOne({ where: { email } });

     if (emailExists) {
         throw new Error(`Email: '${email}' already exists.`);
     }
}


const userExists = async (uuid) => {
    const userExists = await User.findOne( { where: { uuid } } );

    if (!userExists) {
        throw new Error(`There is no user with uuid: ${uuid}`);
    }
}

module.exports = { emailExists, userExists }