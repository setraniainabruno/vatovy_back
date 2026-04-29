import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  password?: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  avatar?: string;

  @ApiPropertyOptional({ enum: ['admin', 'user'] })
  role?: 'admin' | 'user';

  @ApiPropertyOptional({ type: [String] })
  favorites?: string[];
}
