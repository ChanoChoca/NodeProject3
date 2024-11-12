import { Router } from 'express';
import logger from '../utils/logger.js';

const router = Router();

router.get('/loggerTest', (req, res) => {
    logger.emerg('Log de nivel emerg');
    logger.alert('Log de nivel alert');
    logger.crit('Log de nivel crit');
    logger.error('Log de nivel error');
    logger.warning('Log de nivel warning');
    logger.notice('Log de nivel notice');
    logger.info('Log de nivel info');
    logger.debug('Log de nivel debug');

    res.send({ status: 'success', message: 'Logs generados correctamente' });
});

export default router;
