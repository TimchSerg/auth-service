import { Injectable, Inject } from '@nestjs/common'
import { AccountFactory } from '../../domain/factories';
import { AccountRepository } from '../../domain/repositories'
import { Account } from '../../domain/entities'
import { 
  AccountLogin, 
  AccountPassword, 
  AccountId 
} from '../../domain/values'
import { UUID } from 'src/utils/uuid'

@Injectable()
export class AccountFactoryImpl implements AccountFactory {
  constructor(
    @Inject('AccountRepository')
    private accountRepository: AccountRepository,
  ) {}

  async create(
    login: AccountLogin,
    password: AccountPassword,
  ): Promise<Account> {

    return new Account(
      new AccountId(UUID.generate()),
      login,
      password,
      new Date()
    )
  }
}
