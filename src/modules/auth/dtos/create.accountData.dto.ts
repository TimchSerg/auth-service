import { IsString } from 'class-validator';

export class CreateAccountDataDto {

  @IsString()
  name!: string

  @IsString()
  surname!: string

  @IsString()
  patronymic!: string

  @IsString()
  phone!: string

}