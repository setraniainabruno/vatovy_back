// auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  // Connexion admin
  async loginAdmin(data: { email: string; password?: string }) {
    let user = await this.userService.findByEmail(data.email);

    if (user?.role === 'admin') {
      if (!data.password) {
        throw new UnauthorizedException(
          'Mot de passe requis pour un compte admin.',
        );
      }

      const isMatch = await bcrypt.compare(data.password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException('Mot de passe incorrect.');
      }

      return this.generateToken(user);
    }
  }

  // Guest login avec e-mail simplement

  async login(data: { email: string }) {
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
    if (!req) {
      return {
        message: 'Google login failed',
      };
    }

    let user = await this.userService.findByEmail(req.email);

    // console.log("user : ", req);
    // si user n'existe pas → création auto en guest
    if (!user) {
      user = await this.userService.create({
        email: req.email,
        name: req.firstName + ' ' + req.lastName,
        avatar: req.picture,
        role: 'user',
        favorites: [],
      });
    }
    const data = this.generateToken(user);

    return data.accessToken;
  }

  // 🔄 Refresh token endpoint logic
  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);

      const user = await this.userService.findByEmail(payload.email);

      if (!user) {
        throw new Error('User not found');
      }

      return this.generateToken(user);
    } catch (e) {
      throw new Error('Invalid refresh token');
    }
  }

  //Generation token
  private generateToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      avatar: user.avatar,
    };

    const accessToken = this.jwtService.sign(payload);
    return {
      message: 'Guest login success',
      accessToken,
      user,
    };
  }
}
