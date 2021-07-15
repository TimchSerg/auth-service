import { IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  login: string

  @IsString()
  password: string
}