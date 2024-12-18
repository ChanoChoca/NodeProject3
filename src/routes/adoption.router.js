import { Router } from 'express';
import adoptionsController from '../controllers/adoptions.controller.js';
import logger from '../utils/logger.js';

const router = Router();

router.get('/', adoptionsController.getAllAdoptions);

router.get('/:aid', adoptionsController.getAdoption);

router.post('/:uid/:pid', adoptionsController.createAdoption);

export default router;
