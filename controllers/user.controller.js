const bcrypt = require('bcryptjs');
const { User } = require('../models');
/**
 * Método para registrar usuario
 * @param {Request} req  
 * @param {Response} res 
 * @returns {Response.json}
 */
exports.registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        const emailExists = await User.findOne({ where: { email } });

        if (emailExists) {
            return res.status(400).json({
                message: `Email '${email}' already exists`
            });
        }
        const encryptedPassword = bcrypt.hashSync(password, 10);

        const user = await User.create({name, email, password: encryptedPassword});

        return res.json({
            success: true,
            message: 'Account registered',
            data: user
        });

    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

/**
 * Método para obtener datos de un usuario
 * @param {*} req request
 * @param {*} res response
 * @returns jsonResponse
 */
exports.getUserInfo = async (req, res) => {
    
    const { id } = req.params;

    try{
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                status: 'Error',
                message: 'There is no user with such id'
            });
        } else {
            return res.json({
                status: 'Success',
                message: 'User info',
                data: user
            });
        }

    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

/**
 * Método para actualizar un usuario
 * @param {*} req request
 * @param {*} res response
 * @returns jsonResponse
 */
exports.updateUser = async (req, res) => {

    const { id } = req.params;
    const { body } = req.body;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                status: 'Error',
                message: 'There is no user with such id'
            });
        }

        await user.update(body);

        return res.json({
            success: true,
            message: 'User info updated succesfully'
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json(error);
    }
}