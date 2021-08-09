import { Injectable, Inject } from '@nestjs/common'
import { AccountDataFactory } from '../../domain/factories';
import { AccountDataRepository } from '../../domain/repositories'
import { AccountData, Account } from '../../domain/entities'
import {
  Id, 
  AccountName,
  AccountSurname,
  AccountPatronymic,
  AccountId,
  Phone, 
  Email
} from '../../domain/values'
import { UUID } from 'src/utils/uuid'

@Injectable()
export class AccountDataFactoryImpl implements AccountDataFactory {
  constructor(
    @Inject('AccountDataRepository')
    private accountDataRepository: AccountDataRepository,
  ) {}

  async create(
    account: Account,
    name: AccountName,
    surname: AccountSurname,
    patronymic: AccountPatronymic,
    phone: Phone,
    email: Email,
  ): Promise<AccountData> {

    return new AccountData(
      new Id(UUID.generate()),
      account.id,
      name,
      surname,
      patronymic,
      new Date(),
      email,
      phone,
      new Date()
    )
  }
}
