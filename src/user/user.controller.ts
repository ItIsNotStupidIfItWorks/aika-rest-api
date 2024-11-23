import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import joinCompanyDto from './dto/join-company.dto';
import { AuthGuardGuard } from 'src/auth-guard/auth-guard.guard';

@UseGuards(AuthGuardGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@Body() dto: { userID: number }) {
    return this.userService.getMe(dto);
  }

  @Post('join')
  joinCompany(@Body() dto: joinCompanyDto) {
    return this.userService.joinCompany(dto);
  }
}
