export class InvalidFieldError extends Error {
  constructor () {
    super('campo inválido')
    this.name = 'InvalidFieldError'
  }
}
