import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';
import logger from '../utils/logger.js';

const router = Router();

router.post('/register', (req, res) => {
    logger.info('Intentando registrar un nuevo usuario');
    sessionsController.register(req, res);
});

router.post('/login', (req, res) => {
    logger.info('Intentando iniciar sesión');
    sessionsController.login(req, res);
});

router.get('/current', (req, res) => {
    logger.info('Obteniendo la sesión actual');
    sessionsController.current(req, res);
});

router.get('/unprotectedLogin', (req, res) => {
    logger.debug('Accediendo al login no protegido');
    sessionsController.unprotectedLogin(req, res);
});

router.get('/unprotectedCurrent', (req, res) => {
    logger.debug('Obteniendo la sesión no protegida actual');
    sessionsController.unprotectedCurrent(req, res);
});

export default router;
