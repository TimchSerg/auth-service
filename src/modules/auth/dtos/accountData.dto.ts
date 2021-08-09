import { IsString, IsUUID, IsDate } from 'class-validator';

export class AccountDataDto {
  @IsUUID()
  id!: string

  @IsString()
  name!: string

  @IsString()
  surname!: string

  @IsString()
  patronymic!: string

  @IsString()
  email!: string

  @IsString()
  phone!: string

  @IsDate()
  birthday!: Date

  @IsDate()
  createdAt!: Date
}