//Express router
import { Router } from "express";
const router = Router();
//Import Auth
import * as Auth from '../core/auth/auth.system';
//Import Controller
import * as playerController from '../controllers/player.controller';

router.get('/', Auth.get, playerController.getPlayers);
router.get('/:uniqueId', Auth.get, playerController.getPlayerById);
router.post('/', Auth.post, playerController.registerPlayer);
router.put('/:uniqueId', Auth.modify, playerController.updatePlayerById);
router.delete('/:uniqueId', Auth.modify, playerController.deletePlayerById);

export default router;