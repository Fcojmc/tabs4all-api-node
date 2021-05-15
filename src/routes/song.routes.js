const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { bandExistsByUuid } = require('../helpers/band.validator');

const { createSongs } = require('../controllers/song.controller');

/**
 * Router de express
 */
const router = Router();

router.post('/songs/scraper/:uuid', [
    check('uuid').custom(bandExistsByUuid),
    fieldValidator
], createSongs);

module.exports = router;