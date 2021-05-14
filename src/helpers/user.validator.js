const { User } = require('../models');


exports.emailExists = async ( email = '') => {
     const emailExists = await User.findOne({ where: { email } });

     if (emailExists) {
         throw new Error(`Email: '${email}' already exists.`);
     }
}

exports.userExistsById = async (id) => {
    const userExists = await User.findByPk(id);

    if (!userExists) {
        throw new Error(`There is no user with id: ${id}`);
    }
}