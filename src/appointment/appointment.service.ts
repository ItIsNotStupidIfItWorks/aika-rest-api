import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import createAppointmentDto from './dto/create-appointment.dto';
import assignAppointmentToUserDto from './dto/assign-appointment-to-user.dto';
import setClockOutTimeDto from './dto/set-clock-out-time.dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaClient) {}

  async createAppointment(dto: createAppointmentDto) {
    const creator = await this.prisma.user.findUnique({
      where: {
        userID: dto.userID,
      },
    });

    let assignedTo: User;
    if (dto.assigned_userID) {
      assignedTo = await this.prisma.user.findUnique({
        where: {
          userID: dto.assigned_userID,
        },
      });
    }

    const company = await this.prisma.company.findUnique({
      where: {
        companyID: dto.companyID,
      },
    });

    if (!creator || (dto.assigned_userID && !assignedTo) || !company)
      throw new BadRequestException();

    const appointment = await this.prisma.appointment.create({
      data: {
        startTime: dto.startTime,
        endTime: dto.endTime || null,
        title: dto.title,
        description: dto.description,
        creatorID: creator.userID,
        userID: assignedTo.userID || null,
        companyID: dto.companyID,
        handOverRequest: false,
      },
    });

    return appointment;
  }

  async assignAppointmentToUser(dto: assignAppointmentToUserDto) {
    const assignedUser = await this.prisma.user.findUnique({
      where: {
        userID: dto.assigned_userID,
      },
    });

    const appointment = await this.prisma.appointment.findUnique({
      where: {
        appointmentID: dto.appointmentID,
      },
    });

    if (!appointment) throw new BadRequestException('Termin nicht gefunden');
    if (appointment.userID)
      throw new ForbiddenException('Termin gehört schon einem Benutzer');
    if (!assignedUser)
      throw new BadRequestException('Benutzer existiert nicht');

    await this.prisma.appointment.update({
      where: {
        appointmentID: appointment.appointmentID,
      },
      data: {
        userID: assignedUser.userID,
      },
    });

    return { success: true };
  }

  async reassignAppointmentToUser(dto: assignAppointmentToUserDto) {
    const assignedUser = await this.prisma.user.findUnique({
      where: {
        userID: dto.assigned_userID,
      },
    });

    const appointment = await this.prisma.appointment.findUnique({
      where: {
        appointmentID: dto.appointmentID,
      },
    });

    if (!appointment) throw new BadRequestException('Termin nicht gefunden');
    if (!assignedUser)
      throw new BadRequestException('Benutzer existiert nicht');

    await this.prisma.appointment.update({
      where: {
        appointmentID: appointment.appointmentID,
      },
      data: {
        userID: assignedUser.userID,
      },
    });

    return { success: true };
  }

  async setClockOutTime(dto: setClockOutTimeDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        userID: dto.userID,
      },
    });
    const appointment = await this.prisma.appointment.findFirst({
      where: {
        AND: {
          appointmentID: dto.appointmentID,
          userID: user.userID,
        },
      },
    });

    if (!user) throw new BadRequestException('Benutzer nicht gefunden');
    if (!appointment) throw new BadRequestException();

    await this.prisma.appointment.update({
      where: {
        appointmentID: appointment.appointmentID,
      },
      data: {
        clockOutTime: dto.clockOutTime,
      },
    });

    return { success: true };
  }
}
