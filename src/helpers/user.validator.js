const { User } = require('../db/models');


exports.emailExists = async ( email = '') => {
     const emailExists = await User.findOne({ where: { email } });

     if (emailExists) {
         throw new Error(`Email: '${email}' already exists.`);
     }
}


exports.userExists = async (uuid) => {
    const userExists = await User.findOne( { where: { uuid } } );

    if (!userExists) {
        throw new Error(`There is no user with uuid: ${uuid}`);
    }
}

