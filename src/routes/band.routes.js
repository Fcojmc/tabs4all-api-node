const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { bandExists, bandExistsByUuid } = require('../helpers/band.validator');

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
    check('name', 'Band name must not be empty.').not().isEmpty(),
    check('name').custom(bandExists),
    fieldValidator
], createBand);

router.put('/bands/update/:uuid', [
    check('uuid').custom(bandExistsByUuid),
    check('name', 'Band name must not be empty.').not().isEmpty(),
    fieldValidator
], updateBand);

router.delete('/users/delete/:uuid', [
    check('uuid').custom(bandExistsByUuid),
    fieldValidator
], deleteBand);

module.exports = router;