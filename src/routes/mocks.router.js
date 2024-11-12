import { Router } from "express";
import { generateMockPets } from "../mock/mocking.js";
import { generateMockUsers } from "../mock/mocking.js";
import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";
import adoptionModel from "../dao/models/Adoption.js";
import logger from "../utils/logger.js";

const router = Router();

// Endpoint de mocking para generar mascotas
router.get('/mockingpets', (req, res) => {
    logger.debug('Generando mascotas mockeadas');
    const mockPets = generateMockPets(100);
    res.send({ status: "success", payload: mockPets });
});

// Endpoint para /mockingusers
router.get('/mockingusers', async (req, res) => {
    logger.debug('Generando usuarios mockeados');
    const users = generateMockUsers(50);
    res.json(users);
});

// Endpoint para /generateData
router.post('/generateData', async (req, res) => {
    const { users = 0, pets = 0 } = req.body;

    try {
        logger.debug(`Generando datos: usuarios=${users}, mascotas=${pets}`);

        // 1. Generar usuarios y guardarlos en la base de datos
        const mockUsers = generateMockUsers(users)
        const insertedUsers = await userModel.insertMany(mockUsers);

        // 2. Extraer los IDs de los usuarios insertados para asignarlos como dueños de mascotas
        const userIds = insertedUsers.map(user => user._id);

        // 3. Generar mascotas y guardarlas en la base de datos
        const mockPets = generateMockPets(pets, userIds);
        const insertedPets = await petModel.insertMany(mockPets);

        // 4. Crear adopciones para mascotas que tienen dueño
        const adoptions = insertedPets
            .filter(pet => pet.owner)
            .map(pet => ({
                owner: pet.owner,
                pet: pet._id
            }));

        await adoptionModel.insertMany(adoptions);

        res.status(201).json({ message: 'Usuarios y mascotas generados exitosamente' });
    } catch (error) {
        logger.error('Error al generar datos: ' + error.message);
        res.status(500).json({ error: 'Error al generar datos' });
    }
});

export default router;
