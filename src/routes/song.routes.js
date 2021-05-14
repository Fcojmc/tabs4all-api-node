const { Router } = require('express');
const {createSongs} = require('../controllers/song.controller');
/**
 * Router de express
 */
const router = Router();

router.post('/songs/create', createSongs);


module.exports = router;