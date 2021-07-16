import { WrongFormatException } from '../../exceptions'

const NAME_MAX_LENGTH = 50

export class AccountName {

  private _value: string

  constructor(value: string) {
    if (value.length > NAME_MAX_LENGTH) {
      throw new WrongFormatException(
        `Name should be less then ${NAME_MAX_LENGTH} symbols`
      )
    }
    this._value = value
  }

  get value(): string {
    return this._value
  }

  equals(accountName: AccountName): boolean {
    return this._value === accountName._value
  }

  toString(): string {
    return this._value
  }
}