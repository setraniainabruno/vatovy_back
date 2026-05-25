import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { ReactionType } from '../entities/reaction.entity';

export class CreateReactionDto {
  @ApiProperty({
    example: 'user-id-uuid',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'conte-id-uuid',
  })
  @IsString()
  conteId: string;

  @ApiProperty({
    enum: ['love', 'like', 'dislike'],
    example: 'love',
  })
  @IsEnum(['love', 'like', 'dislike'] as const)
  type: ReactionType;
}
