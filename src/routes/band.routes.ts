import Router from 'express';
import { check } from 'express-validator';
import { bandExistsByUuid } from '../helpers/band.validator';
import bandNameCheck from '../middlewares/band-check';
import fieldValidator from '../middlewares/field-validator';
import loginVerifier from '../middlewares/login-verifier';
import validateJWT from '../middlewares/jwt-validator';
import isAdminRole from '../middlewares/role-validator';
import { getAllBands,
         getBandById,
         createBand,
         deleteBand,
         updateBand } from '../controllers/band.controller';

const router = Router();

router.get('/bands/all', getAllBands);

router.get('/bands/:uuid', [
    check('uuid').custom(bandExistsByUuid),
    fieldValidator
], getBandById);

router.post('/bands/create', [
    validateJWT,
    loginVerifier,
    isAdminRole,
    bandNameCheck
], createBand);

router.put('/bands/update/:uuid', [
    validateJWT,
    loginVerifier,
    isAdminRole,
    check('uuid').custom(bandExistsByUuid),
    fieldValidator
], updateBand);

router.delete('/bands/delete/:uuid', [
    validateJWT,
    loginVerifier,
    isAdminRole,
    check('uuid').custom(bandExistsByUuid),
    fieldValidator
], deleteBand);

export default router;