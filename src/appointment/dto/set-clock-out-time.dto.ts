import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class setClockOutTimeDto {
  @IsNotEmpty()
  @IsNumber()
  userID: number;

  @IsNotEmpty()
  @IsDateString()
  clockOutTime: Date;

  @IsNotEmpty()
  @IsString()
  appointmentID: number;
}
