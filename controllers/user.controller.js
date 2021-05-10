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
            status: true,
            message: 'Account registered',
            data: user
        });

    } catch (err) {
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
exports.getUser = async (req, res) => {
    
    const { id } = req.params;

    try{
        const user = await User.findByPk(id);

        if (!user) {
            res.json({
                status: 'Error',
                message: 'There is no user with such id'
            });
        } else {
            res.json({
                status: 'Success',
                message: 'User info',
                data: user
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}