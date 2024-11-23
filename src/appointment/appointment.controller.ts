import { Controller, Patch, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import createAppointmentDto from './dto/create-appointment.dto';
import assignAppointmentToUserDto from './dto/assign-appointment-to-user.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  createAppointment(dto: createAppointmentDto) {
    return this.appointmentService.createAppointment(dto);
  }

  @Patch('assign')
  assignAppointmentToUser(dto: assignAppointmentToUserDto) {
    return this.appointmentService.assignAppointmentToUser(dto);
  }

  @Patch('reassign')
  reassignAppointmentToUser(dto: assignAppointmentToUserDto) {
    return this.appointmentService.assignAppointmentToUser(dto);
  }
}
