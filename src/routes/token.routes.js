//Express router
import { Router } from "express";
const router = Router();
//Import Auth
import * as Auth from '../core/auth/auth.system';
//Import Controller
import * as tokenController from '../controllers/token.controller';

router.post('/', Auth.post, tokenController.generateToken);
router.delete('/:token', Auth.modify, tokenController.deleteToken);

export default router;