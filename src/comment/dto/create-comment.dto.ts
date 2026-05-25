import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    example: 'conte-uuid-123',
  })
  @IsString()
  @IsNotEmpty()
  conteId: string;

  @ApiProperty({
    example: 'user-uuid-456',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: "J'adore cette histoire ! Très bien racontée.",
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
