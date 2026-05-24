import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  conteId: string;

  @IsString()
  userId: string;

  @IsString()
  content: string;
}
