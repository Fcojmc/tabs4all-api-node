const { Router } = require('express');
const { validateJWT, loginVerifier } = require('../middlewares');

const { setFavouriteBands,
        unsetFavouriteBands,
        setFavouriteTabs,
        unsetFavouriteTabs } = require('../controllers/favourites.controller');

const router = Router();

router.post('/set-user-favourites/bands', [
    validateJWT,
    loginVerifier
], setFavouriteBands);

router.post('/set-user-favourites/tabs', [
    validateJWT,
    loginVerifier
], setFavouriteTabs);

router.post('/unset-user-favourites/bands', [
    validateJWT,
    loginVerifier
], unsetFavouriteBands);

router.post('/unset-user-favourites/tabs', [
    validateJWT,
    loginVerifier
], unsetFavouriteTabs);

module.exports = router;