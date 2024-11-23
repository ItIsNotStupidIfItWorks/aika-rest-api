import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaClient],
})
export class CompanyModule {}
