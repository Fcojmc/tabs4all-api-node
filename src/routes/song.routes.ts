import Router from 'express';
import { check } from 'express-validator';
import { bandExistsByUuid } from '../helpers/band.validator';
import { songScraper } from '../controllers/song.controller';
import fieldValidator from '../middlewares/field-validator';
import loginVerifier from '../middlewares/login-verifier';
import isAdminRole from '../middlewares/role-validator';
import validateJWT from '../middlewares/jwt-validator';

const router = Router();

router.get('/songs/scraper/:uuid', [
    validateJWT,
    loginVerifier,
    isAdminRole,
    check('uuid').custom(bandExistsByUuid),
    fieldValidator
], songScraper);

export default router;