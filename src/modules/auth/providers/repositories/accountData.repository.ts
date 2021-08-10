import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { AccountDataRepository } from '../../domain/repositories'
import { AccountData } from '../../domain/entities'
import { AccountDataModel } from 'src/modules/database/models'
import { 
  AccountId,
  AccountName,
  AccountSurname,
  AccountPatronymic,
  Phone,
  Email,
  Id   
} from '../../domain/values'
import { UUID } from 'src/utils/uuid'

function reconstitute(accountDataModel: AccountDataModel): AccountData {
  return new AccountData(
    new Id(UUID.from(accountDataModel.id)),
    new AccountId(UUID.from(accountDataModel.accountId)),
    new AccountName(accountDataModel.name),
    new AccountSurname(accountDataModel.surname),
    new AccountPatronymic(accountDataModel.patronymic),
    accountDataModel.birthday,
    new Email(accountDataModel.email),
    new Phone(accountDataModel.phone),
    accountDataModel.createdAt
  )
}

@Injectable()
export class AccountDataRepositoryImpl implements AccountDataRepository {
  constructor(
    @InjectModel(AccountDataModel)
    private accountDataModel: typeof AccountDataModel
  ) {}

  async getById(id: Id): Promise<AccountData | null> {
    const model = await this.accountDataModel.findOne({ 
      where: { id: id.value.toString() }
    })
    return model == null ? null : reconstitute(model)
  }

  async getByPhone(phone: Phone): Promise<AccountData | null> {
    const model = await this.accountDataModel.findOne({
      where: { phone: phone.value } 
    })
    return model == null ? null : reconstitute(model)
  }

  async getAll(): Promise<Array<AccountData>> {
    const array = await this.accountDataModel.findAll()
    return array.map((model) => reconstitute(model))
  }

  async save(account: AccountData): Promise<void> {
    const [ model ] = await this.accountDataModel.findOrBuild({
      where: { id: account.id.value.toString() }
    })

    model.set({
      id: account.id.value.toString(),
      accountId: account.accountId.value.toString(),
      name: account.name.value.toString(),
      surname: account.surname.value.toString(),
      patronymic: account.patronymic.value.toString(),
      birthday: account.birthday,
      email: account.email.value.toString(),
      phone: account.phone.value.toString(),
      createdAt: account.createdAt
    })

    await model.save()
  }

  async delete(account: AccountData): Promise<void> {
    await this.accountDataModel.destroy({ where: { id: account.id.value.toString() }})
  }
}
