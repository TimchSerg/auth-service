import { IsString } from 'class-validator';

export class CreateAccountDataDto {
  
  @IsString()
  accountId!: string

  @IsString()
  name!: string

  @IsString()
  surname!: string

  @IsString()
  patronymic!: string

  @IsString()
  phone!: string

  @IsString()
  email!: string;

}