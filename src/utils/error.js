// src/utils/errors.js
export class CustomError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}

export const errorDictionary = {
    USER_ALREADY_EXISTS: {
        code: "USER_ALREADY_EXISTS",
        message: "El usuario ya está registrado.",
    },
    PET_CREATION_FAILED: {
        code: "PET_CREATION_FAILED",
        message: "Error al crear la mascota.",
    },
    INVALID_PET_DATA: {
        code: "INVALID_PET_DATA",
        message: "Datos de la mascota incompletos o incorrectos.",
    },
    // Agrega otros errores comunes según el contexto de la aplicación
};
