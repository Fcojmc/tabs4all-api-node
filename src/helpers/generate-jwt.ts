import jwt from 'jsonwebtoken';

const generateJWT = (uuid: string = '') => {
    return new Promise( (resolve, reject) => {
        const payload = { uuid };

        const secret = process.env.SECRETORPRIVATEKEY as string;

        jwt.sign( payload, secret, {
            expiresIn: '4h'
        }, (error: Error | null, token: string | undefined) => {
            if (error) {
                console.log(error);
                reject('Token could not be generated');
            }

            resolve(token);
        });
    });
}

export default generateJWT;