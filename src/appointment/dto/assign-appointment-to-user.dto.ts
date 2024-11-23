import { IsNotEmpty, IsNumber } from 'class-validator';

export default class assignAppointmentToUserDto {
  @IsNotEmpty()
  @IsNumber()
  assigned_userID: number;

  @IsNotEmpty()
  @IsNumber()
  appointmentID: number;
}
