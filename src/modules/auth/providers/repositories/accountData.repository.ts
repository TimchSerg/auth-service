import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { AccountDataRepository } from '../../domain/repositories'
import { Account, AccountData } from '../../domain/entities'
import { AccountDataModel } from 'src/modules/database/models'
import { 
  AccountId, 
  AccountLogin, 
  AccountPassword,   
} from '../../domain/values'
import { UUID } from 'src/utils/uuid'

function reconstitute(accountDataModel: AccountDataModel): AccountData {
  return new AccountData(
    new AccountId(UUID.from(accountDataModel.id)),
    new AccountLogin(accountDataModel.login),
    new AccountPassword(accountDataModel.hash, accountDataModel.salt),
    accountDataModel.createdAt
  )
}

@Injectable()
export class AccountRepositoryImpl implements AccountDataRepository {
  constructor(
    @InjectModel(AccountDataModel)
    private accountDataModel: typeof AccountDataModel
  ) {}

  async getById(id: AccountId): Promise<Account | null> {
    const model = await this.accountDataModel.findOne({ 
      where: { id: id.value.toString() }
    })
    return model == null ? null : reconstitute(model)
  }

  async getByLogin(login: AccountLogin): Promise<Account | null> {
    const model = await this.accountDataModel.findOne({
      where: { login: login.value } 
    })
    return model == null ? null : reconstitute(model)
  }

  async getAll(): Promise<Array<Account>> {
    const array = await this.accountDataModel.findAll()
    return array.map((model) => reconstitute(model))
  }

  async save(account: Account): Promise<void> {
    const [ model ] = await this.accountDataModel.findOrBuild({
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
    await this.accountDataModel.destroy({ where: { id: account.id.value.toString() }})
  }
}
