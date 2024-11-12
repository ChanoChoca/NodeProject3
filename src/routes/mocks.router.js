import { Router } from "express";
import { generateMockPets } from "../mock/mocking.js";
import { generateMockUsers } from "../mock/mocking.js";
import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";
import adoptionModel from "../dao/models/Adoption.js";

const router = Router();

// Endpoint para /mockingusers
router.get('/mockingusers', async (req, res) => {
    const users = generateMockUsers(50)
    res.json(users)
})

// Endpoint para /generateData
router.post('/generateData', async (req, res) => {
    const { users = 0, pets = 0 } = req.body

    try {
        // 1. Generar usuarios y guardarlos en la base de datos
        const mockUsers = generateMockUsers(users)
        const insertedUsers = await userModel.insertMany(mockUsers)

        // 2. Extraer los IDs e los usuarios insertados para asignarlos como dueños de mascotas
        const userIds = insertedUsers.map(user => user._id)

        // 3. Generar mascotas y guardarlas en la base de datos
        const mockPets = generateMockPets(pets, userIds)
        const insertedPets = await petModel.insertMany(mockPets)

        // 4. Crear adopciones para moscotas que tienen dueño
        const adoptions = insertedPets
            .filter(pet => pet.owner)
            .map(pet => ({
                owner: pet.owner,
                pet: pet._id
            }))

        await adoptionModel.insertMany(adoptions)

        res.status(201).json({ message: 'Usuarios y mascotas generados exitosamente' })
    } catch (error) {
        console.error('Error al generar datos: ', error)
        res.status(500).json({ error: 'Error al generar datos' })
    }
})

export default router;
