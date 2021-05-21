const jwt = require('jsonwebtoken');

const generateJWT = (uuid = '') => {
    
    return new Promise( (resolve, reject) => {
        const payload = { uuid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            
            if (err) {
                console.log(err);
                reject('Token could not be generated');
            }

            resolve(token);
        });
    });
}


module.exports = { generateJWT }