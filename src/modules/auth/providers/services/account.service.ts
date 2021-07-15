import { Injectable } from '@nestjs/common';
// import { AccountDto } from 'src/modules/auth/dtos';

export interface Account {
  login: string,
  password: string,
}

@Injectable()
export class AccountService {
  private readonly accounts: Account[] = [];

  create(account: Account) {
    this.accounts.push(account);
  }

  findAll(): Account[] {
    return this.accounts;
  }
}
