import { WrongFormatException } from '../../exceptions'

const REGEX_LOGIN = /^[a-z]([\w]|[\d]){0,39}$/

export class AccountLogin {

  private _value: string
  
  constructor(value: string) {
    if (!REGEX_LOGIN.test(value)) {
      throw new WrongFormatException(`Wrong login name format ${value}`)
    }
    this._value = value
  }

  get value(): string {
    return this._value
  }

  equals(accountLogin: AccountLogin): boolean {
    return this._value === accountLogin._value
  }

  toString(): string {
    return this._value
  }
}
