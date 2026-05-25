import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateConteDto {
  @ApiProperty({
    example: 'Le Petit Chaperon Rouge',
    description: 'Titre du conte',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example:
      'Une jeune fille traverse la forêt pour rendre visite à sa grand-mère.',
    description: 'Description du conte',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    example: '5:32',
    description: 'Durée formatée du conte',
  })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiProperty({
    example: 332,
    description: 'Durée du conte en secondes',
    minimum: 0,
  })
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  durationSeconds: number;

  @ApiPropertyOptional({
    example: 'f2b5a4f1-6a0c-4f55-9d9f-b9f61d22b201',
    description: 'ID de la catégorie liée au conte',
  })
  @IsOptional()
  @IsString()
  categoryId: string;

  @ApiProperty({
    example: 'https://ik.imagekit.io/vatovy/thumbnail.jpg',
    description: 'URL de la miniature',
  })
  @IsUrl()
  thumbnail: string;

  @ApiProperty({
    example: 'https://ik.imagekit.io/vatovy/audio.mp3',
    description: 'URL du fichier audio',
  })
  @IsUrl()
  audioUrl: string;
}
