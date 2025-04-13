// Tipos de errores personalizados
export class DatabaseError extends Error {
    constructor(message = "Ocurrió un error al acceder a la base de datos.") {
        super(message);
        this.name = "DATABASE_ERROR";
      }
}
export class UserInputError extends Error {
    constructor(message= "Los campos ingresados no son validos" ){
        super(message)
        this.name = "USER_INPUT_ERROR"
    }
}
export class ApiError extends Error {
    constructor(message= "Hay un problema con la API" ){
        super(message)
        this.name = "EXTERNAL_API_ERROR"
    }
}
export class NotFoundError extends Error {
    constructor(message = "Recurso no encontrado") {
      super(message);
      this.name = "NOT_FOUND_ERROR";
    }
  }
  
class AuthError extends Error {}

interface ErrorResponse {
  message: string;
  statusCode: number;
}

// Logger de ejemplo
const logger = {
  info: console.info,
  warn: console.warn,
  error: console.error,
  debug: console.debug,
};

/**
 * Maneja errores lanzados y devuelve un objeto con mensaje y status HTTP.
 * El error real se loguea pero no se expone al cliente.
 */
export function handleError(error: unknown): ErrorResponse {
  if (error instanceof UserInputError) {
    logger.warn(`User input error: ${error.message}`, { error });
    return {
      message: `Error de validación: ${error.message}`,
      statusCode: 400,
    };
  }

  if (error instanceof AuthError) {
    logger.warn(`Auth error: ${error.message}`, { error });
    return {
      message: `No tiene permisos para realizar esta acción.`,
      statusCode: 403,
    };
  }

  if (error instanceof NotFoundError) {
    logger.info(`Recurso no encontrado: ${error.message}`, { error });
    return {
      message: `El recurso solicitado no fue encontrado.`,
      statusCode: 404,
    };
  }

  if (error instanceof ApiError) {
    logger.error(`Error en servicio externo: ${error.message}`, { error });
    return {
      message: `Error al comunicarse con un servicio externo.`,
      statusCode: 502,
    };
  }

  if (error instanceof DatabaseError) {
    logger.error(`Error de base de datos: ${error.message}`, { error });
    return {
      message: `Error interno. Por favor intente más tarde.`,
      statusCode: 500,
    };
  }

  // Fallback para errores inesperados
  const genericError = error instanceof Error ? error : new Error(String(error));
  logger.error(`Error inesperado: ${genericError.message}`, { error: genericError });

  return {
    message: `Ocurrió un error inesperado. Por favor, contacte a soporte.`,
    statusCode: 500,
  };
}