import { 
  AccountId, 
  AccountLogin, 
  AccountPassword,  
} from '../values'
import { AccountRepository } from '../repositories'

export class Account {

  private _id: AccountId
  private _login: AccountLogin
  private _password: AccountPassword
  private _createdAt: Date

  constructor(
    id: AccountId,
    login: AccountLogin,
    password: AccountPassword,
    createdAt: Date
  ) {
    this._id = id
    this._login = login
    this._password = password
    this._createdAt = createdAt
  }

  get id(): AccountId {
    return this._id
  }

  get login(): AccountLogin {
    return this._login
  }

  set login(login: AccountLogin) {
    this._login = login
  }

  get password(): AccountPassword {
    return this._password
  }

  set password(password: AccountPassword) {
    this._password = password
  }

  get createdAt(): Date {
    return this._createdAt
  }

  async checkPassword(password: string): Promise<boolean> {
    return this._password.check(password)
  }

  equals(account: Account): boolean {
    return this.id.equals(account.id)
  }
}
