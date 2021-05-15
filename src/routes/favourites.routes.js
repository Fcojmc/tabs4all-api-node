const { Router } = require('express');

const { setFavouriteBands, unsetFavouriteBands } = require('../controllers/users-bands.controller');

const router = Router();

router.post('/user-favourites/bands', setFavouriteBands);
router.delete('/user-favourites/bands', unsetFavouriteBands);

module.exports = router;