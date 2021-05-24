const { Router } = require('express');
const { check } = require('express-validator');
const { bandExistsByUuid } = require('../helpers/band.validator');

const { bandNameCheck,
        fieldValidator, 
        validateJWT, 
        loginVerifier,
        isAdminRole} = require('../middlewares');

const { getAllBands,
        getBandById,
        createBand,
        deleteBand,
        updateBand } = require('../controllers/band.controller');

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

module.exports = router;