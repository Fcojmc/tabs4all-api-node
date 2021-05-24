const bandNameCheck = require('./band-check');
const fieldValidator = require('./field-validator');
const jwtValidator = require('./jwt-validator');
const loginVerifier = require('./login-verifier');
const roleValidator = require('./role-validator');


module.exports = {
    ...bandNameCheck,
    ...fieldValidator,
    ...jwtValidator,
    ...loginVerifier,
    ...roleValidator
}