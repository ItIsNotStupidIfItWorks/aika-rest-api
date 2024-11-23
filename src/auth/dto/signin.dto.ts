import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class signinDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
