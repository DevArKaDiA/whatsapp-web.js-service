import { type ValidationError, validateOrReject as classValidatorValidateOrReject } from 'class-validator'
import { CompactValidationErrors } from '../utils/exeptions'

class BaseModel {
  async validateOrReject (): Promise<void> {
    await classValidatorValidateOrReject(this).catch((errors: ValidationError[]) => {
      throw new CompactValidationErrors(errors)
    }
    )
  }
}

export { BaseModel }
