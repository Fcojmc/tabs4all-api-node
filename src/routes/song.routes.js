const { Router } = require('express');
const { check } = require('express-validator');
const { bandExistsByUuid } = require('../helpers/band.validator');
const { songScraper } = require('../controllers/song.controller');

const { fieldValidator, 
        validateJWT, 
        loginVerifier, 
        isAdminRole } = require('../middlewares');

const router = Router();

router.get('/songs/scraper/:uuid', [
    validateJWT,
    loginVerifier,
    isAdminRole,
    check('uuid').custom(bandExistsByUuid),
    fieldValidator
], songScraper);

module.exports = router;