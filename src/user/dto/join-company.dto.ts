import { IsNotEmpty, IsNumber } from 'class-validator';

export default class joinCompanyDto {
  @IsNotEmpty()
  @IsNumber()
  companyID: number;

  @IsNotEmpty()
  @IsNumber()
  userID: number;
}
