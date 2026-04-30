// auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  // Guest login avec e-mail simplement

  async login(data) {
    let user = await this.userService.findByEmail(data.email);

    // si user n'existe pas → création auto en guest
    if (!user) {
      user = await this.userService.create({
        email: data.email,
        name: 'Guest User',
        avatar: '',
        role: 'user',
        favorites: [],
      });
    }

    return this.generateToken(user);
  }

  // Guest login avec Google
  async googleGuestLogin(req) {
    if (!req.user) {
      return {
        message: 'Google login failed',
      };
    }

    let user = await this.userService.findByEmail(req.user.email);

    // si user n'existe pas → création auto en guest
    if (!user) {
      user = await this.userService.create({
        email: req.user.email,
        name: req.user.firstName + ' ' + req.user.lastName,
        avatar: req.user.picture,
        role: 'user',
        favorites: [],
      });
    }

    return this.generateToken(user);
  }

  //Generation token
  private generateToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    return {
      message: 'Guest login success',
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
