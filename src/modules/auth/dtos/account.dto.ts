import { IsString, IsUUID, IsDate } from 'class-validator';

export class AccountDto {
  @IsUUID()
  id!: string

  @IsString()
  login!: string

  @IsDate()
  createdAt!: Date
}