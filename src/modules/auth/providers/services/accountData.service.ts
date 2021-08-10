import { AccountDataDto, CreateAccountDataDto, UpdateAccountDataDto } from "../../dtos";
import { Injectable, Inject } from '@nestjs/common';
import { AccountDataRepository, AccountRepository } from '../../domain/repositories';
import { AccountDataFactory } from '../../domain/factories';
import {
 AccountId,
 AccountName,
 AccountSurname,
 AccountPatronymic,
 Phone, 
 Email,
 Id 
} from '../../domain/values';
import { InjectModel } from '@nestjs/sequelize'
import { AccountDataModel } from 'src/modules/database/models'

@Injectable()
export class AccountDataService {
  constructor(
    @Inject('AccountRepository')
    private accountRepository: AccountRepository,
    @Inject('AccountDataRepository')
    private accountDataRepository: AccountDataRepository,
    @Inject('AccountDataFactory')
    private accountDataFactory: AccountDataFactory,
    @InjectModel(AccountDataModel)
    private accountDataModel: typeof AccountDataModel,
  ) {}

  async getById(id: string): Promise<AccountDataDto> {
    return await this.accountDataModel.findOne({
      where: { id: id }
    }) as AccountDataDto
  }

  async getAll(): Promise<Array<AccountDataDto>> {
    return await this.accountDataModel.findAll()
  }

  async getByPhone(phone: string): Promise<AccountDataDto | null> {
    return await this.accountDataModel.findOne({
      where: { phone: phone }
    }) as AccountDataDto
  }

  async createAccountData(params: CreateAccountDataDto): Promise<void> {
    const account = await this.accountRepository.getById(
      AccountId.from(params.accountId)
    )

    if (account == null) {
      throw Error(`Account with '${params.accountId}' is not exist`)
    }

    const accountData = await this.accountDataFactory.create(
      account,
      new AccountName(params.name),
      new AccountSurname(params.surname),
      new AccountPatronymic(params.patronymic),
      new Phone(params.phone),
      new Email(params.email)
    )

    await this.accountDataRepository.save(accountData)
  }

  async updateAccountData(id: string, params: UpdateAccountDataDto): Promise<void> {
    const accountId = Id.from(id);

    const requiredAccountData = await this.accountDataRepository.getById(accountId)

    if (!requiredAccountData) {
      throw new Error(`Account was not found by id ${id}`)
    }

    requiredAccountData.name = new AccountName(params.name)
    requiredAccountData.surname = new AccountSurname(params.surname)
    requiredAccountData.patronymic = new AccountPatronymic(params.patronymic)
    requiredAccountData.email = new Email(params.email)
    
    await this.accountDataRepository.save(requiredAccountData)    
  }
}
