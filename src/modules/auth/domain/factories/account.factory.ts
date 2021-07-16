import { Account } from '../entities'
import { AccountPassword, AccountLogin } from '../values';

export interface AccountFactory {

  create(
    login: AccountLogin, 
    password: AccountPassword,
  ): Promise<Account>
}
