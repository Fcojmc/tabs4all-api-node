import bandNameCheck from './band-check';
import fieldValidator from './field-validator';
import validateJWT from './jwt-validator';
import loginVerifier from './login-verifier';
import isAdminRole from './role-validator';


export default {
    ...bandNameCheck,
    ...fieldValidator,
    ...validateJWT,
    ...loginVerifier,
    ...isAdminRole
}