import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class createCompanyDto {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  adress: string;

  @IsNotEmpty()
  @IsNumber()
  userID: number;
}
