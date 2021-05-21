const bcrypt = require('bcryptjs');
const { User } = require('../db/models');

exports.registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        
        const encryptedPassword = bcrypt.hashSync(password, 10);

        const user = await User.create({name, email, password: encryptedPassword});

        return res.json({
            success: true,
            message: 'Account registered',
            data: user
        });

    } catch(err) {
        console.log(err);
        throw new Error('Error trying to create an account.');
    }
}

exports.getUserInfo = async (req, res) => {
    
    const { uuid } = req.params;

    try{
        const user = await User.findOne( { where: { uuid } } );

        return res.json({
            status: 'Success',
            message: 'User info',
            data: user
         });
        
    } catch(err) {
        console.log(err);
        throw new Error('Error trying to get user info.');
    }
}

exports.updateUser = async (req, res) => {

    const { uuid } = req.params;
    const { body } = req.body;

    try {
        const user = await User.findOne( { where: { uuid } } );

        await user.update(body);

        return res.json({
            success: true,
            message: 'User info updated succesfully'
        });
        
    } catch(error) {
        console.log(error);
        throw new Error('Error trying to update an user.');
    }
}