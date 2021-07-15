import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateAccountDto } from "../dtos";
import { AccountService } from "../providers/services";

export interface Account {
  login: string,
  password: string,
}

@Controller('accounts')
export class AccountController{
  constructor(private accountService: AccountService) {}

  @Get()
  async findAll(): Promise<Account[]> {
    return this.accountService.findAll();
  }

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    this.accountService.create(createAccountDto);
    return "Testing 'create cat'";
  }
};