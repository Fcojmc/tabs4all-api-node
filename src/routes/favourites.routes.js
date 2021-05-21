const { Router } = require('express');

const { validateJWT, loginVerifier } = require('../middlewares');

const { setFavouriteBands,
        unsetFavouriteBands,
        setFavouriteTabs,
        unsetFavouriteTabs } = require('../controllers/favourites.controller');

const router = Router();

router.post('/user-favourites/bands', [
    validateJWT,
    loginVerifier
], setFavouriteBands);

router.post('/user-favourites/tabs', [
    validateJWT,
    loginVerifier
], setFavouriteTabs);

router.delete('/user-favourites/bands', [
    validateJWT,
    loginVerifier
], unsetFavouriteBands);

router.delete('/user-favourites/tabs', [
    validateJWT,
    loginVerifier
], unsetFavouriteTabs);

module.exports = router;