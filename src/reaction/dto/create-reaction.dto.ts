import { IsString, IsEnum } from 'class-validator';
import type { ReactionType } from '../entities/reaction.entity';

export class CreateReactionDto {
  @IsString()
  userId: string;

  @IsString()
  conteId: string;

  @IsEnum(['love', 'like', 'dislike'])
  type: ReactionType;
}
