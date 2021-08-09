import { AccountData, Account } from '../entities'
import { AccountName, AccountPatronymic, AccountSurname, Phone, Email} from '../values';

export interface AccountDataFactory {

  create(
    account: Account,
    name: AccountName,
    surname: AccountSurname,
    patronymic: AccountPatronymic,
    phone: Phone,
    email: Email,  
  ): Promise<AccountData>
}
