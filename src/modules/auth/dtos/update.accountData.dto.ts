import { IsString, IsDate } from 'class-validator';

export class UpdateAccountDataDto {

  @IsString()
  name!: string

  @IsString()
  surname!: string

  @IsString()
  patronymic!: string

  @IsString()
  phone!: string

  @IsString()
  email!: string

  @IsDate()
  birthday!: Date
}