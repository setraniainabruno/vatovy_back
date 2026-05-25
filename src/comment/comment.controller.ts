import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

import { CommentsService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // =========================
  // CREATE COMMENT
  // =========================
  @Post()
  @ApiOperation({ summary: 'Créer un commentaire' })
  @ApiBody({
    type: CreateCommentDto,
    examples: {
      example1: {
        value: {
          conteId: 'conte-uuid-123',
          userId: 'user-uuid-456',
          content: "J'adore cette histoire !",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Commentaire créé',
    schema: {
      example: {
        id: 'comment-uuid-789',
        conteId: 'conte-uuid-123',
        userId: 'user-uuid-456',
        content: "J'adore cette histoire !",
        createdAt: '2026-05-25T10:00:00.000Z',
      },
    },
  })
  create(@Body() dto: CreateCommentDto) {
    return this.commentsService.create(dto);
  }

  // =========================
  // FIND BY CONTE
  // =========================
  @Get('conte/:conteId')
  @ApiOperation({ summary: 'Lister les commentaires d’un conte' })
  @ApiParam({
    name: 'conteId',
    example: 'conte-uuid-123',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des commentaires',
    schema: {
      example: [
        {
          id: 'comment-1',
          conteId: 'conte-uuid-123',
          userId: 'user-1',
          content: 'Super conte !',
          createdAt: '2026-05-25T10:00:00.000Z',
        },
        {
          id: 'comment-2',
          conteId: 'conte-uuid-123',
          userId: 'user-2',
          content: 'Très intéressant',
          createdAt: '2026-05-25T11:00:00.000Z',
        },
      ],
    },
  })
  findByConte(@Param('conteId') conteId: string) {
    return this.commentsService.findByConte(conteId);
  }

  // =========================
  // DELETE COMMENT
  // =========================
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un commentaire' })
  @ApiParam({
    name: 'id',
    example: 'comment-uuid-789',
  })
  @ApiResponse({
    status: 200,
    description: 'Commentaire supprimé',
    schema: {
      example: {
        message: 'Commentaire supprimé avec succès',
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
