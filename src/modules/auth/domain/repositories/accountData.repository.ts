import { AccountData } from '../entities'
import { AccountId, Id } from '../values'

export interface AccountDataRepository {

  getById(id: Id): Promise<AccountData | null>

  getAll(): Promise<Array<AccountData>>

  save(accountData: AccountData): Promise<void>

  delete(accountData: AccountData): Promise<void>

}