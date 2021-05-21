const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { User } = require('../db/models');

exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            throw new Error(`Email ${email} does not match.`);
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            throw new Error(`Password does not match.`);
        }

        const token = await generateJWT( user.uuid );

        return res.json({
            succes: true,
            message: 'Login succesful',
            data: token
        });

    } catch (error) {
        console.log(error);
        throw new Error('Error trying to login.');
    }
}