import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    example: 'Contes Fantastiques',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
