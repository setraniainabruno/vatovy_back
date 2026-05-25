import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Contes Fantastiques',
    description: 'Nom de la catégorie',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
