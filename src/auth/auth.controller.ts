// auth.controller.ts

import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Res,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //Connexion admin
  @Post('admin-login')
  adminLogin(@Body() body: LoginDto) {
    return this.authService.loginAdmin(body);
  }
  
  // Guest login simple avec email
  @Post('guest-login')
  guestLogin(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  // Guest login avec Google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req, @Res() res) {
    const accessToken = await this.authService.googleGuestLogin(req.user);

    const frontUrl = process.env.FRONT_URL;

    return res.redirect(`${frontUrl}/success?token=${accessToken}`);
  }

  @Post('refresh')
  refresh(@Body('refresh_token') token: string) {
    return this.authService.refreshToken(token);
  }
}
