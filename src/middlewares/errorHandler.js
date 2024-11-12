// src/middlewares/errorHandler.js
import { errorDictionary } from '../utils/error.js';
import {CustomError} from "../utils/error.js";

export function errorHandler(err, req, res, next) {
    if (err instanceof CustomError) {
        const error = errorDictionary[err.code];
        return res.status(400).send({ status: "error", message: error.message });
    }
    res.status(500).send({ status: "error", message: "Internal Server Error" });
}
