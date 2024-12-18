import { adoptionsService, petsService, usersService } from "../services/index.js";
import logger from "../utils/logger.js"; // Asegúrate de importar tu logger

const getAllAdoptions = async (req, res) => {
    try {
        logger.info('Accediendo a la lista de adopciones');
        const result = await adoptionsService.getAll();
        res.send({ status: "success", payload: result });
    } catch (error) {
        logger.error(`Error al obtener todas las adopciones: ${error.message}`);
        res.status(500).send({ status: "error", error: "Error al obtener las adopciones" });
    }
};

const getAdoption = async (req, res) => {
    try {
        const adoptionId = req.params.aid;
        logger.info(`Consultando adopción con ID: ${adoptionId}`);
        const adoption = await adoptionsService.getBy({ _id: adoptionId });
        if (!adoption) {
            logger.error(`Adopción con ID ${adoptionId} no encontrada`);
            return res.status(404).send({ status: "error", error: "Adoption not found" });
        }
        res.send({ status: "success", payload: adoption });
    } catch (error) {
        logger.error(`Error al obtener la adopción con ID ${req.params.aid}: ${error.message}`);
        res.status(500).send({ status: "error", error: "Error al obtener la adopción" });
    }
};

const createAdoption = async (req, res) => {
    try {
        const { uid, pid } = req.params;
        logger.info(`Creando adopción para usuario ${uid} con mascota ${pid}`, { params: req.params });

        // Verificar si el usuario existe
        const user = await usersService.getUserById(uid);
        if (!user) {
            logger.error(`Usuario con ID ${uid} no encontrado`);
            return res.status(404).send({ status: "error", error: "User not found" });
        }

        // Verificar si la mascota existe
        const pet = await petsService.getBy({ _id: pid });
        if (!pet) {
            logger.error(`Mascota con ID ${pid} no encontrada`);
            return res.status(404).send({ status: "error", error: "Pet not found" });
        }

        // Verificar si la mascota ya fue adoptada
        if (pet.adopted) {
            logger.error(`Mascota con ID ${pid} ya está adoptada`);
            return res.status(400).send({ status: "error", error: "Pet is already adopted" });
        }

        // Actualizar el usuario y la mascota
        user.pets.push(pet._id);
        await usersService.update(user._id, { pets: user.pets });
        await petsService.update(pet._id, { adopted: true, owner: user._id });

        // Crear el registro de adopción
        await adoptionsService.create({ owner: user._id, pet: pet._id });

        res.send({ status: "success", message: "Pet adopted" });
    } catch (error) {
        logger.error(`Error al crear la adopción para usuario ${req.params.uid} y mascota ${req.params.pid}: ${error.message}`);
        res.status(500).send({ status: "error", error: "Error al crear la adopción" });
    }
};

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
};
