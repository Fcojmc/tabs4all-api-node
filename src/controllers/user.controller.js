const bcrypt = require('bcryptjs');
const { User } = require('../db/models');
/**
 * Método para registrar usuario
 * @param {Request} req  
 * @param {Response} res 
 * @returns {Response.json}
 */
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
        throw new Error(err.message);
    }
}

/**
 * Método para obtener datos de un usuario
 * @param {*} req request
 * @param {*} res response
 * @returns jsonResponse
 */
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
        throw new Error(err.message);
    }
}

/**
 * Método para actualizar un usuario
 * @param {*} req request
 * @param {*} res response
 * @returns jsonResponse
 */
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
        throw new Error(error.message);
    }
}