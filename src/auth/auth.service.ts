import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import signupDto from './dto/signup.dto';
import { PrismaClient } from '@prisma/client';
import signinDto from './dto/signin.dto';
import * as jwt from 'jsonwebtoken';
import signoutDto from './dto/signout.dto';
import refreshDto from './dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaClient) {}

  async signup(dto: signupDto) {
    try {
    } catch (err) {
      throw new BadRequestException(err);
    }
    const hash = await argon2.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email.toLowerCase(),
        password: hash,
      },
    });

    delete user.password;

    return user;
  }

  async signin(dto: signinDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email.toLowerCase(),
      },
    });

    if (!user)
      throw new UnauthorizedException('EMail oder Passwort ist falsch');

    const hash = await argon2.verify(user.password, dto.password);

    if (!hash)
      throw new UnauthorizedException('EMail oder Passwort ist falsch');

    delete user.password;

    const accessToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET_PKEY,
      { expiresIn: '1d' },
    );

    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET_PKEY_REFRESH,
      { expiresIn: '28d' },
    );

    await this.prisma.token.create({
      data: {
        refreshToken: refreshToken,
        userID: user.userID,
      },
    });

    return { accessToken, refreshToken };
  }

  async signout(dto: signoutDto) {
    try {
      await this.prisma.token.delete({
        where: {
          refreshToken: dto.refreshToken,
        },
      });
    } catch (err) {
      throw new BadRequestException();
    }

    return {
      success: true,
    };
  }

  async refresh(dto: refreshDto) {
    const refreshToken = await this.prisma.token.findUnique({
      where: {
        refreshToken: dto.refreshToken,
      },
      include: {
        user: {
          select: {
            userID: true,
          },
        },
      },
    });

    const user = await this.prisma.user.findUnique({
      where: {
        userID: refreshToken.user.userID,
      },
    });

    if (!refreshToken) throw new UnauthorizedException();

    const accessToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET_PKEY,
      { expiresIn: '1d' },
    );
    const _refreshToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET_PKEY_REFRESH,
      { expiresIn: '14d' },
    );

    await this.prisma.token.update({
      where: {
        refreshToken: refreshToken.refreshToken,
      },
      data: {
        refreshToken: _refreshToken,
      },
    });

    return { accessToken, refreshToken: _refreshToken };
  }
}
