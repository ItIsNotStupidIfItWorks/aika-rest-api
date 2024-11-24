import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import createCompanyDto from './dto/create-company.dto';
import createGuestDto from './dto/create-guest.dto';
import { AuthGuardGuard } from 'src/auth-guard/auth-guard.guard';

@UseGuards(AuthGuardGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  createCompany(@Body() dto: createCompanyDto) {
    return this.companyService.createCompany(dto);
  }

  @Post('create/guest')
  createGuest(@Body() dto: createGuestDto) {
    return this.companyService.createGuest(dto);
  }

  @Get('getAllJoined')
  getAllJoined(@Body() dto: { userID: number }) {
    return this.companyService.getAllJoined(dto);
  }
}
