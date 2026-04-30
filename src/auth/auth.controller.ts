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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    const token = await this.authService.googleGuestLogin(req);

    const frontUrl = process.env.FRONT_URL;
    
    return res.redirect(`${frontUrl}?token=${token}`);
  }
}
