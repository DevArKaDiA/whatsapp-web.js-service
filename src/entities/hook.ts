import { Events as WhatsappEvents } from 'whatsapp-web.js'
import { IsEnum, IsString, IsUUID, IsUrl } from 'class-validator'
import { randomUUID } from 'node:crypto'
import { BaseModel } from './base'

export class Hook extends BaseModel {
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
