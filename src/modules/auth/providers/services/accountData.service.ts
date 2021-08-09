import { AccountDataDto, CreateAccountDataDto, UpdateAccountDataDto } from "../../dtos";
import { Injectable, Inject } from '@nestjs/common';
import { AccountDataRepository } from '../../domain/repositories';
import { AccountDataFactory } from '../../domain/factories';
//import {
//  AccountId,
//  AccountName,
//  AccountSurname,
//  AccountPatronymic,
//  Phone 
//} from '../../domain/values';
import { InjectModel } from '@nestjs/sequelize'
import { AccountDataModel } from 'src/modules/database/models'

@Injectable()
export class AccountDataService {
  constructor(
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
  //  const account = await this.accountFactory.create(
  //    new AccountDomain(params.domain),
  //    new AccountName(params.name),
  //    new TaxIdentityNumber(params.taxId),
  //    new RegistrationReasonCode(params.regCode),
  //    new Phone(params.phone)
  //  )

  //  await this.accountRepository.save(account)
  }

  async updateAccountData(id: string, params: UpdateAccountDataDto): Promise<void> {
  //  const userId = Id.from(id)
  //  const phone = new Phone(params.phone)

  //  const userByPhone = await this.userRepository.getByPhone(phone)
  //  const requiredUser = await this.userRepository.getById(userId)

  //  if (!requiredUser) {
  //    throw new Error(`User was not found by id ${id}`)
  //  }

  //  if (userByPhone?.id === requiredUser.id) {
  //    throw new Error(`Phone ${params.phone} already taken`)
  //  }

  //  requiredUser.name = new UserName(params.name)
  //  requiredUser.surname = new UserSurname(params.surname)
  //  requiredUser.phone = new Phone(params.phone)
    
  //  await this.userRepository.save(requiredUser)    
  }
}
