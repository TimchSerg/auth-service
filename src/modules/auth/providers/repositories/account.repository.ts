import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { AccountRepository } from '../../domain/repositories'
import { Account } from '../../domain/entities'
import { AccountModel } from 'src/modules/database/models'
import { 
  AccountId, 
  AccountLogin, 
  AccountPassword,   
} from '../../domain/values'
import { UUID } from 'src/utils/uuid'

function reconstitute(accountModel: AccountModel): Account {
  return new Account(
    new AccountId(UUID.from(accountModel.id)),
    new AccountLogin(accountModel.login),
    new AccountPassword(accountModel.hash, accountModel.salt),
    accountModel.createdAt
  )
}

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(
    @InjectModel(AccountModel)
    private accountModel: typeof AccountModel
  ) {}

  async getById(id: AccountId): Promise<Account | null> {
    const model = await this.accountModel.findOne({ 
      where: { id: id.value.toString() }
    })
    return model == null ? null : reconstitute(model)
  }

  async getByLogin(login: AccountLogin): Promise<Account | null> {
    const model = await this.accountModel.findOne({
       where: { login: login.value } 
    })
    return model == null ? null : reconstitute(model)
  }

  async getAll(): Promise<Array<Account>> {
    const array = await this.accountModel.findAll()
    return array.map((model) => reconstitute(model))
  }

  async save(account: Account): Promise<void> {
    const [ model ] = await this.accountModel.findOrBuild({
       where: { id: account.id.value.toString() }
    })

    model.set({
      id: account.id.value.toString(),
      login: account.login.value,
      hash: account.password.hash,
      salt: account.password.salt,
      createdAt: account.createdAt
    })

    await model.save()
  }

  async delete(account: Account): Promise<void> {
    await this.accountModel.destroy({ where: { id: account.id.value.toString() }})
  }
}
