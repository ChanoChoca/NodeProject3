import { Router } from 'express';
import petsController from '../controllers/pets.controller.js';
import uploader from '../utils/uploader.js';
import logger from '../utils/logger.js';

const router = Router();

router.get('/', (req, res) => {
    logger.info('Accediendo a la lista de mascotas');
    petsController.getAllPets(req, res);
});

router.post('/', (req, res) => {
    logger.info('Creando nueva mascota');
    petsController.createPet(req, res);
});

router.post('/withimage', uploader.single('image'), (req, res) => {
    logger.info('Creando nueva mascota con imagen');
    petsController.createPetWithImage(req, res);
});

router.put('/:pid', (req, res) => {
    logger.info(`Actualizando mascota con ID: ${req.params.pid}`);
    petsController.updatePet(req, res);
});

router.delete('/:pid', (req, res) => {
    logger.warn(`Eliminando mascota con ID: ${req.params.pid}`);
    petsController.deletePet(req, res);
});

export default router;
