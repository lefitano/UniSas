import { AppError } from './AppError.js'

export const ErrorFactory = {
  invalido:      (msg) => new AppError(msg, 400),
  naoAutorizado: (msg) => new AppError(msg, 401),
  naoEncontrado: (msg) => new AppError(msg, 404),
  conflito:      (msg) => new AppError(msg, 409),
  interno:       (msg) => new AppError(msg, 500),
}
