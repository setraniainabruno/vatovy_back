import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // CREATE
  async create(dto: CreateUserDto) {
    // Vérifier si l'email existe déjà
    const existingUser = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new Error('Cet email existe déjà');
    }

    // Mettre null sur les champs vides sauf email et name
    Object.keys(dto).forEach((key) => {
      if (
        key !== 'email' &&
        key !== 'name' &&
        (dto[key] === '' || dto[key] === undefined)
      ) {
        dto[key] = null;
      }
    });

    // 🔐 Hash password si fourni
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    // Création de l'utilisateur
    const user = this.userRepo.create(dto);
    return await this.userRepo.save(user);
  }

  // FIND ALL
  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  // FIND ONE
  async findOne(id: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  //FIND BY EMAIL
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { email } });
  }

  // UPDATE
  async update(id: string, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, dto);
    return this.userRepo.save(user);
  }

  // DELETE
  async remove(id: string) {
    const user = await this.findOne(id);
    return this.userRepo.remove(user);
  }
}
