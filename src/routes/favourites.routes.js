const { Router } = require('express');

const { setFavouriteBands,
        unsetFavouriteBands,
        setFavouriteTabs,
        unsetFavouriteTabs } = require('../controllers/favourites.controller');

const router = Router();

router.post('/user-favourites/bands', setFavouriteBands);

router.post('/user-favourites/tabs', setFavouriteTabs);

router.delete('/user-favourites/bands', unsetFavouriteBands);

router.delete('/user-favourites/tabs', unsetFavouriteTabs);

module.exports = router;