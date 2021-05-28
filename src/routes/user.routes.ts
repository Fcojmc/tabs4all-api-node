import Router from 'express';
import { check } from 'express-validator';
import { registerUser, getUserInfo, updateUser } from '../controllers/user.controller';
import fieldValidator from '../middlewares/field-validator';
import { emailExists, userExists } from '../helpers/user.validator';

const router = Router();

router.post('/users/register', [
    check('name', 'Name must not be empty.').not().isEmpty(),
    check('password', 'Password must not be empty').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6}),
    check('email', 'Email must not be empty').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(emailExists),
    fieldValidator
], registerUser);

router.get('/users/:uuid', [
    check('uuid').custom(userExists),
    fieldValidator
], getUserInfo);

router.put('/users/update/:uuid', [
    check('uuid').custom(userExists),
    fieldValidator
], updateUser);

export default router;