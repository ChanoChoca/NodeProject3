import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';
import logger from '../utils/logger.js'; // Asegúrate de importar tu logger

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) {
            logger.error("Datos incompletos para el registro");
            return res.status(400).send({ status: "error", error: "Incomplete values" });
        }
        const exists = await usersService.getUserByEmail(email);
        if (exists) {
            logger.error(`El usuario con email ${email} ya existe`);
            return res.status(400).send({ status: "error", error: "User already exists" });
        }
        const hashedPassword = await createHash(password);
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword
        };
        const result = await usersService.create(user);
        res.send({ status: "success", payload: result._id });
    } catch (error) {
        logger.error(`Error al registrar usuario: ${error.message}`);
        res.status(500).send({ status: "error", error: "Error al registrar usuario" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            logger.error("Datos incompletos para iniciar sesión");
            return res.status(400).send({ status: "error", error: "Incomplete values" });
        }
        const user = await usersService.getUserByEmail(email);
        if (!user) {
            logger.error(`Usuario con email ${email} no existe`);
            return res.status(404).send({ status: "error", error: "User doesn't exist" });
        }
        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword) {
            logger.error(`Contraseña incorrecta para el usuario con email ${email}`);
            return res.status(400).send({ status: "error", error: "Incorrect password" });
        }
        const userDto = UserDTO.getUserTokenFrom(user);
        const token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: "1h" });
        res.cookie('coderCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Logged in" });
    } catch (error) {
        logger.error(`Error al iniciar sesión: ${error.message}`);
        res.status(500).send({ status: "error", error: "Error al iniciar sesión" });
    }
};

const current = async (req, res) => {
    try {
        const cookie = req.cookies['coderCookie'];
        const user = jwt.verify(cookie, 'tokenSecretJWT');
        if (user) {
            return res.send({ status: "success", payload: user });
        }
    } catch (error) {
        logger.error(`Error al obtener el usuario actual: ${error.message}`);
        res.status(500).send({ status: "error", error: "Error al obtener usuario actual" });
    }
};

const unprotectedLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            logger.error("Datos incompletos para unprotected login");
            return res.status(400).send({ status: "error", error: "Incomplete values" });
        }
        const user = await usersService.getUserByEmail(email);
        if (!user) {
            logger.error(`Usuario con email ${email} no existe`);
            return res.status(404).send({ status: "error", error: "User doesn't exist" });
        }
        const isValidPassword = await passwordValidation(user, password);
        if (!isValidPassword) {
            logger.error(`Contraseña incorrecta para unprotected login con email ${email}`);
            return res.status(400).send({ status: "error", error: "Incorrect password" });
        }
        const token = jwt.sign(user, 'tokenSecretJWT', { expiresIn: "1h" });
        res.cookie('unprotectedCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Unprotected Logged in" });
    } catch (error) {
        logger.error(`Error en unprotected login: ${error.message}`);
        res.status(500).send({ status: "error", error: "Error en unprotected login" });
    }
};

const unprotectedCurrent = async (req, res) => {
    try {
        const cookie = req.cookies['unprotectedCookie'];
        const user = jwt.verify(cookie, 'tokenSecretJWT');
        if (user) {
            return res.send({ status: "success", payload: user });
        }
    } catch (error) {
        logger.error(`Error al obtener el usuario actual en unprotected: ${error.message}`);
        res.status(500).send({ status: "error", error: "Error al obtener usuario actual en unprotected" });
    }
};

export default {
    register,
    login,
    current,
    unprotectedLogin,
    unprotectedCurrent
};
