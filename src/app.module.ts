import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CompanyModule, UserModule, AppointmentModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
