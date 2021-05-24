const fieldValidator = require('./field-validator');
const jwtValidator = require('./jwt-validator');
const loginVerifier = require('./login-verifier');
const roleValidator = require('./role-validator');


module.exports = {
    ...fieldValidator,
    ...jwtValidator,
    ...loginVerifier,
    ...roleValidator
}