import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class createAppointmentDto {
  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @IsOptional()
  @IsDateString()
  endTime?: Date;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  userID: number; // creator

  @IsOptional()
  @IsNumber()
  assigned_userID?: number; // who is assigned

  @IsNotEmpty()
  @IsNumber()
  companyID: number;
}
