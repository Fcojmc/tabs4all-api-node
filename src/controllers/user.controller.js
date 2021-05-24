const bcrypt = require('bcryptjs');
const path = require('path');
const { User } = require('../db/models');
const { ApiError } = require('../error/api.error');

/**
 * Método para crear un usuario
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response.json}
 */
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

/**
 * Método para obtener la información de un usuario
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response.json}
 */
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

/**
 * Método para actualizar un usuario
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response.json}
 */
exports.updateUser = async (req, res, next) => {

    const { uuid } = req.params;
    const userData = JSON.parse(req.body.data);

    try {
        const user = await User.findOne( { where: { uuid } } );

        let imageName = user.image;

        if (req.files) {
            let image = req.files.image;
            imageName = new Date().valueOf() + '_' + image.name;
            image.mv(path.join(__dirname, '../../public/user-images/', imageName), (error) => {
                if (error) {
                    throw ApiError.badRequest('Error uploading image.');
                }
            }); 
        }

        await user.update({
            name: userData.name,
            image: imageName
        });

        return res.json({
            success: true,
            message: 'User info updated succesfully'
        });
    } catch(error) {
        next(error);
    }
}