import { WrongFormatException } from '../../exceptions'
import { UUID } from 'src/utils/uuid'

export class AccountId {

  static from(value: string): AccountId {
    try {
      return new AccountId(UUID.from(value))
    } catch {
      throw new WrongFormatException(`Wrong account id format ${value}`)
    }
  }

  private _value: UUID

  constructor(value: UUID) {
    this._value = value
  }

  get value(): UUID {
    return this._value
  }

  equals(accountId: AccountId): boolean {
    return this._value.equals(accountId._value)
  }

  toString(): string {
    return this._value.toString()
  }
}
