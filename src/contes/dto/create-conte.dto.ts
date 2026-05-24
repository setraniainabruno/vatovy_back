import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  durationSeconds: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsUrl()
  thumbnail: string;

  @IsUrl()
  audioUrl: string;
}
