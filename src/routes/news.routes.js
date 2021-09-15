//Express router
import { Router } from "express";
const router = Router();
//Import Auth
import * as Auth from '../core/auth/auth.system';
//Import Controller
import * as newsController from '../controllers/news.controller';

router.get('/', Auth.get, newsController.getNews);
router.get('/:newsName', Auth.get, newsController.getNewByName);
router.get('/type/:newsType', Auth.get, newsController.getNewsByType);
router.post('/', Auth.post, newsController.createNews);
router.put('/:newsName', Auth.modify, newsController.modifyNewByName);
router.delete('/:newsName', Auth.modify, newsController.deleteNewByName);

export default router;