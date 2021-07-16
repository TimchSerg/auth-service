import { IsString, IsUUID, IsDate } from 'class-validator';

export class AccountDto {
  @IsUUID()
  id!: string

  @IsString()
  login!: string

  @IsString()
  password!: string

  @IsDate()
  createdAt!: Date
}