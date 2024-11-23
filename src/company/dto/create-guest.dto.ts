import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class createGuestDto {
  @IsNotEmpty()
  @IsNumber()
  userID: number; // owner

  @IsNotEmpty()
  @IsNumber()
  companyID: number;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}
