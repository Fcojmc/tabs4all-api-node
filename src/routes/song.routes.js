const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator, validateJWT, loginVerifier, isAdminRole } = require('../middlewares');
const { bandExistsByUuid } = require('../helpers/band.validator');

const { songScraper } = require('../controllers/song.controller');

const router = Router();

router.post('/songs/scraper/:uuid', [
    validateJWT,
    loginVerifier,
    isAdminRole,
    check('uuid').custom(bandExistsByUuid),
    fieldValidator
], songScraper);

module.exports = router;