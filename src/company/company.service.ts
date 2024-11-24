import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import createCompanyDto from './dto/create-company.dto';
import createGuestDto from './dto/create-guest.dto';
import randomString from 'src/functions/randomString';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaClient) {}

  async createCompany(dto: createCompanyDto) {
    const owner = await this.prisma.user.findUniqueOrThrow({
      where: {
        userID: dto.userID,
      },
    });

    const identificationCode =
      `${randomString(4)}-${randomString(4)}-${randomString(4)}-${randomString(4)}`.toUpperCase();

    const company = await this.prisma.company.create({
      data: {
        companyName: dto.companyName,
        adress: dto.adress,
        primaryOwnerID: owner.userID,
        identificationCode: identificationCode,
      },
    });

    const userCompany = await this.prisma.user_Company.create({
      data: {
        userID: owner.userID,
        companyID: company.companyID,
      },
    });

    const _userCompany = await this.prisma.user_Company.findFirst({
      where: {
        companyID: userCompany.companyID,
        userID: userCompany.userID,
      },
      include: {
        company: true,
      },
    });

    return _userCompany;
  }

  async createGuest(dto: createGuestDto) {
    const company = await this.prisma.company.findFirst({
      where: {
        AND: {
          companyID: dto.companyID,
          primaryOwnerID: dto.userID,
        },
      },
    });

    if (!company) {
      throw new BadRequestException('Unternehmen nicht gefunden');
    }

    let codeAlreadyUsed = false;
    let identificationCode = '';

    while (!codeAlreadyUsed) {
      identificationCode = (
        Math.random() * (9_999_999 - 1_000_000) +
        1_000_000
      ).toString();

      codeAlreadyUsed = !!(await this.prisma.user.findFirst({
        where: {
          identificationCode: identificationCode,
        },
      }));
    }

    const user = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        identificationCode: identificationCode,
      },
    });

    await this.prisma.user_Company.create({
      data: {
        userID: user.userID,
        companyID: company.companyID,
      },
    });

    return user;
  }

  async getAllJoined(dto: { userID: number }) {
    const user = await this.prisma.user.findUnique({
      where: {
        userID: dto.userID,
      },
      include: {
        userCompany: {
          include: { company: true },
        },
      },
    });

    return { companies: user.userCompany };
  }
}
