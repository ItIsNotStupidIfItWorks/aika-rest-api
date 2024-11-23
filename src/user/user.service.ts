import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import joinCompanyDto from './dto/join-company.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClient) {}

  getMe(dto: { userID: number }) {
    const user = this.prisma.user.findUnique({
      where: {
        userID: dto.userID,
      },
    });

    return user;
  }

  async joinCompany(dto: joinCompanyDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        userID: dto.userID,
      },
    });

    const company = await this.prisma.company.findUnique({
      where: { companyID: dto.companyID },
    });

    if (!user || !company) throw new BadRequestException('Ungültige Anfrage');

    const userCompany = await this.prisma.user_Company.create({
      data: {
        userID: user.userID,
        companyID: company.companyID,
        admin: false,
      },
    });

    return { success: true };
  }
}
