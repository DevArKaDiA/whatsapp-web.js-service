import { type ValidationError } from 'class-validator'

export class CompactValidationErrors extends Error {
  errors: ValidationError[] = []
  constructor (errors: ValidationError[] = []) {
    super('Validation errors')
    this.errors = errors
  }
}
