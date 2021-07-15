import { IsString, IsUUID, IsDate, IsBoolean } from 'class-validator';

export class AccountDto {
  @IsUUID()
  id!: string

  @IsString()
  login!: string

  @IsString()
  password!: string

  @IsBoolean()
  verification!: boolean

  @IsDate()
  createdAt!: Date
}