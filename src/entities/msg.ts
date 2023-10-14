import { BaseModel } from './base'
import { IsPhoneNumber, IsString } from 'class-validator'
import { type CountryCode, parsePhoneNumber, type PhoneNumber } from 'libphonenumber-js'

export class Msg extends BaseModel {
  @IsString()
    msg: string

  @IsPhoneNumber()
    phone: string

  _phone: PhoneNumber
  constructor ({ phone, msg, countryCode }: { phone: string, msg: string, countryCode: undefined | CountryCode }) {
    super()
    this._phone = parsePhoneNumber(phone, countryCode)
    this.phone = this._phone.formatInternational()
    this.msg = msg
  }
}
