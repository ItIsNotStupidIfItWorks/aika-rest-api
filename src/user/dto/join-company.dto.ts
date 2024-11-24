import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class joinCompanyDto {
  @IsNotEmpty()
  @IsNumber()
  userID: number;

  @IsNotEmpty()
  @IsString()
  companyIdentifier: string;
}
