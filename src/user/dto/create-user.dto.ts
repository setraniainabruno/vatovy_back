import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({
    enum: ['admin', 'user'],
    default: 'user',
    required: false,
  })
  @IsOptional()
  @IsEnum(['admin', 'user'])
  role?: 'admin' | 'user';

  @ApiProperty({
    type: [String],
    default: [],
    required: false,
  })
  @IsOptional()
  favorites?: string[];
}
