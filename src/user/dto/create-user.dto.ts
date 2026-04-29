import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty({ enum: ['admin', 'user'], default: 'user' })
  role: 'admin' | 'user';

  @ApiProperty({ type: [String], default: [] })
  favorites: string[];
}