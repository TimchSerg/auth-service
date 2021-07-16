import { generateHash, generateSalt } from 'src/utils/crypto.util';
import { WrongFormatException } from '../../exceptions';

const PASSWORD_MAX_LENGTH = 50

export class AccountPassword {

  static async generate(password: string): Promise<AccountPassword> {
    if (password.length > PASSWORD_MAX_LENGTH) {
      throw new WrongFormatException(
        `Password should be less then ${PASSWORD_MAX_LENGTH} symbols. ` +
        `Received password's length is ${password.length}.`
      )
    }

    const salt = await generateSalt()
    const hash = await generateHash(password, salt)
    return new AccountPassword(hash, salt)
  }

  private _hash: string
  private _salt: string

  constructor(hash: string, salt: string) {
    this._hash = hash
    this._salt = salt
  }

  get hash(): string {
    return this._hash
  }

  get salt(): string {
    return this._salt
  }

  async check(password: string): Promise<boolean> {
    return await generateHash(password, this._salt) === this._hash
  }

  equals(accountPassword: AccountPassword): boolean {
    return this._hash === accountPassword._hash
      && this._salt === accountPassword._salt
  }

  toString(): string {
    return `${this._hash} ${this._salt}`
  }
}
