import { usersService } from "../services/index.js";
import logger from '../utils/logger.js'; // Asegúrate de importar tu logger

const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.send({ status: "success", payload: users });
    } catch (error) {
        logger.error(`Error al obtener todos los usuarios: ${error.message}`);
        res.status(500).send({ status: "error", error: "Error al obtener usuarios" });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) {
            logger.error(`Usuario con ID ${userId} no encontrado`);
            return res.status(404).send({ status: "error", error: "User not found" });
        }
        res.send({ status: "success", payload: user });
    } catch (error) {
        logger.error(`Error al obtener el usuario con ID ${req.params.uid}: ${error.message}`);
        res.status(500).send({ status: "error", error: "Error al obtener usuario" });
    }
};

const updateUser = async (req, res) => {
    try {
        const updateBody = req.body;
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) {
            logger.error(`Usuario con ID ${userId} no encontrado para actualizar`);
            return res.status(404).send({ status: "error", error: "User not found" });
        }
        await usersService.update(userId, updateBody);
        res.send({ status: "success", message: "User updated" });
    } catch (error) {
        logger.error(`Error al actualizar el usuario con ID ${req.params.uid}: ${error.message}`);
        res.status(500).send({ status: "error", error: "Error al actualizar usuario" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) {
            logger.error(`Usuario con ID ${userId} no encontrado para eliminar`);
            return res.status(404).send({ status: "error", error: "User not found" });
        }
        await usersService.delete(userId);
        res.send({ status: "success", message: "User deleted" });
    } catch (error) {
        logger.error(`Error al eliminar el usuario con ID ${req.params.uid}: ${error.message}`);
        res.status(500).send({ status: "error", error: "Error al eliminar usuario" });
    }
};

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
};
