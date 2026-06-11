import { AppError } from './AppError.js'

export class ErrorFactory {
  static invalido(msg)      { return new AppError(msg, 400) }
  static naoAutorizado(msg) { return new AppError(msg, 401) }
  static naoEncontrado(msg) { return new AppError(msg, 404) }
  static conflito(msg)      { return new AppError(msg, 409) }
  static interno(msg)       { return new AppError(msg, 500) }
}
