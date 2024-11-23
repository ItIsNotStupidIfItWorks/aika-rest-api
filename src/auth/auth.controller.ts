import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import signupDto from './dto/signup.dto';
import signinDto from './dto/signin.dto';
import signoutDto from './dto/signout.dto';
import refreshDto from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: signupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: signinDto) {
    return this.authService.signin(dto);
  }

  @Post('signout')
  signout(@Body() dto: signoutDto) {
    return this.authService.signout(dto);
  }

  @Post('refresh')
  refresh(@Body() dto: refreshDto) {
    return this.authService.refresh(dto);
  }
}
