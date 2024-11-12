import { Router } from 'express';
import adoptionsController from '../controllers/adoptions.controller.js';
import logger from '../utils/logger.js';

const router = Router();

router.get('/', (req, res) => {
    logger.info('Accediendo a la lista de adopciones');
    adoptionsController.getAllAdoptions(req, res);
});

router.get('/:aid', (req, res) => {
    const { aid } = req.params;
    logger.info(`Consultando adopción con ID: ${aid}`);
    adoptionsController.getAdoption(req, res);
});

router.post('/:uid/:pid', (req, res) => {
    const { uid, pid } = req.params;
    logger.info(`Creando adopción para usuario ${uid} con mascota ${pid}`, { params: req.params });
    adoptionsController.createAdoption(req, res);
});

export default router;
