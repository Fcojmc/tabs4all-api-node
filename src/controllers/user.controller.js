const bcrypt = require('bcryptjs');
const { User } = require('../db/models');

exports.registerUser = async (req, res, next) => {

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
        next(error);
    }
}

exports.getUserInfo = async (req, res, next) => {
    
    const { uuid } = req.params;

    try{
        const user = await User.findOne( { where: { uuid } } );

        return res.json({
            success: true,
            message: 'User info',
            data: user
         });
        
    } catch(err) {
        next(error);
    }
}

exports.updateUser = async (req, res, next) => {

    const { uuid } = req.params;
    const data = req.body.data;

    try {
        const user = await User.findOne( { where: { uuid } } );

        await user.update(body);

        return res.json({
            success: true,
            message: 'User info updated succesfully'
        });
        
    } catch(error) {
        next(error);
    }
}