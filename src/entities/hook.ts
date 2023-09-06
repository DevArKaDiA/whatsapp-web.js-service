import { Events as WhatsappEvents } from 'whatsapp-web.js'
import { IsEnum, IsString, IsUUID, IsUrl, type ValidationError, validateOrReject as classValidatorValidateOrReject } from 'class-validator'
import { randomUUID } from 'node:crypto'
import { CompactValidationErrors } from '../utils/exeptions'

class BaseModel {
  async validateOrReject (): Promise<void> {
    await classValidatorValidateOrReject(this).catch((errors: ValidationError[]) => {
      throw new CompactValidationErrors(errors)
    }
    )
  }
}

export default class Hook extends BaseModel {
  @IsUUID()
    uuid: string

  @IsString()
  @IsUrl()
    hookUrl: string

  @IsEnum(WhatsappEvents, { each: true })
    events: WhatsappEvents[] = []

  constructor ({ hookUrl, events }: { hookUrl: string, events: WhatsappEvents[] }) {
    super()
    this.uuid = randomUUID()
    this.events = events
    this.hookUrl = hookUrl
  }
}
