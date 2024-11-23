import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService, PrismaClient],
})
export class AppointmentModule {}
