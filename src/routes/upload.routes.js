const { uploadImage } = require('../controllers/upload');
const { Router } = require('express');
const { check } = require('express-validator');
const router = new Router();



router.post('/images/upload', uploadImage);


module.exports = router;