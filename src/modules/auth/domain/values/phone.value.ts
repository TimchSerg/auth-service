import { WrongFormatException } from '../exceptions'
import { isE164 } from 'src/utils/phone.util'

export class Phone {

  private _value: string

  constructor(value: string) {
    if (!isE164(value)) {
      throw new WrongFormatException(
        `Wrong phone number format (does not match E.164) ${value}`
      )
    }
    this._value = value
  }

  get value(): string {
    return this._value
  }

  equals(phone: Phone): boolean {
    return this._value === phone._value
  }

  toString(): string {
    return this._value
  }
}