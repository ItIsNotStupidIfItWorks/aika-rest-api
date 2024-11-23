import { Body, Controller, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import createCompanyDto from './dto/create-company.dto';
import createGuestDto from './dto/create-guest.dto';

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
}
