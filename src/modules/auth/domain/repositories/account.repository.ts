import { Account } from '../entities'
import { AccountLogin, AccountId } from '../values'

export interface AccountRepository {

  getById(id: AccountId): Promise<Account | null>

  getByLogin(login: AccountLogin): Promise<Account | null>

  getAll(): Promise<Array<Account>>

  save(account: Account): Promise<void>

  delete(account: Account): Promise<void>
}