import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import logger from '../utils/logger.js';

const router = Router();

router.get('/', (req, res) => {
    logger.info('Accediendo a la lista de usuarios');
    usersController.getAllUsers(req, res);
});

router.get('/:uid', (req, res) => {
    const { uid } = req.params;
    logger.info(`Consultando usuario con ID: ${uid}`);
    usersController.getUser(req, res);
});

router.put('/:uid', (req, res) => {
    const { uid } = req.params;
    logger.info(`Actualizando usuario con ID: ${uid}`);
    usersController.updateUser(req, res);
});

router.delete('/:uid', (req, res) => {
    const { uid } = req.params;
    logger.warn(`Eliminando usuario con ID: ${uid}`);
    usersController.deleteUser(req, res);
});

export default router;
