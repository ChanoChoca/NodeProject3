import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js";
import __dirname from "../utils/index.js";
import { CustomError } from "../utils/error.js";
import logger from "../utils/logger.js"; // Asegúrate de importar tu logger

const getAllPets = async (req, res) => {
    try {
        logger.info('Accediendo a la lista de mascotas');
        const pets = await petsService.getAll();
        res.send({ status: "success", payload: pets });
    } catch (error) {
        logger.error(`Error al obtener todas las mascotas: ${error.message}`);
        res.status(500).send({ status: "error", error: "Error al obtener las mascotas" });
    }
};

const createPet = async (req, res, next) => {
    try {
        logger.info('Creando nueva mascota');
        const { name, specie, birthDate } = req.body;
        if (!name || !specie || !birthDate) {
            logger.error("Datos incompletos para crear la mascota");
            throw new CustomError("INVALID_PET_DATA", "Incomplete values");
        }
        const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
        const result = await petsService.create(pet);
        res.send({ status: "success", payload: result });
    } catch (error) {
        logger.error(`Error al crear la mascota: ${error.message}`);
        next(error);
    }
};

const updatePet = async (req, res) => {
    try {
        const petUpdateBody = req.body;
        const petId = req.params.pid;
        logger.info(`Actualizando mascota con ID: ${req.params.pid}`);
        const result = await petsService.update(petId, petUpdateBody);
        res.send({ status: "success", message: "Pet updated" });
    } catch (error) {
        logger.error(`Error al actualizar la mascota con ID ${req.params.pid}: ${error.message}`);
        res.status(500).send({ status: "error", error: "Error al actualizar la mascota" });
    }
};

const deletePet = async (req, res) => {
    try {
        const petId = req.params.pid;
        logger.warn(`Eliminando mascota con ID: ${req.params.pid}`);
        const result = await petsService.delete(petId);
        res.send({ status: "success", message: "Pet deleted" });
    } catch (error) {
        logger.error(`Error al eliminar la mascota con ID ${req.params.pid}: ${error.message}`);
        res.status(500).send({ status: "error", error: "Error al eliminar la mascota" });
    }
};

const createPetWithImage = async (req, res) => {
    try {
        logger.info('Creando nueva mascota con imagen');
        const file = req.file;
        const { name, specie, birthDate } = req.body;

        if (!name || !specie || !birthDate) {
            logger.error("Datos incompletos para crear la mascota con imagen");
            return res.status(400).send({ status: "error", error: "Incomplete values" });
        }

        const pet = PetDTO.getPetInputFrom({
            name,
            specie,
            birthDate,
            image: `${__dirname}/../public/img/${file.filename}`
        });

        const result = await petsService.create(pet);
        res.send({ status: "success", payload: result });
    } catch (error) {
        logger.error(`Error al crear la mascota con imagen: ${error.message}`);
        res.status(500).send({ status: "error", error: "Error al crear la mascota con imagen" });
    }
};

export default {
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage
};
