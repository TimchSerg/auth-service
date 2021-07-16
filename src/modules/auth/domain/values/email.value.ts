import { WrongFormatException } from '../exceptions'
import { isEmail } from 'src/utils/email.util'

export class Email {

  private _value: string

  constructor(value: string) {
    if (!isEmail(value)) {
      throw new WrongFormatException(
        `Wrong email format ${value}`
      )
    }
    this._value = value
  }

  get value(): string {
    return this._value
  }

  equals(email: Email): boolean {
    return this._value === email._value
  }

  toString(): string {
    return this._value
  }
}