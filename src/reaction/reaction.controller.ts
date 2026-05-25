import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

import { ReactionsService } from './reaction.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { ReactionType } from './entities/reaction.entity';

@ApiTags('Reactions')
@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  // =========================
  // CREATE / REACT
  // =========================
  @Post()
  @ApiOperation({ summary: 'Ajouter une réaction sur un conte' })
  @ApiBody({
    type: CreateReactionDto,
    examples: {
      example1: {
        value: {
          userId: 'user-uuid-123',
          conteId: 'conte-uuid-456',
          type: 'love',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Réaction enregistrée',
  })
  react(@Body() dto: CreateReactionDto) {
    return this.reactionsService.react(dto);
  }

  // =========================
  // FIND BY CONTE
  // =========================
  @Get('conte/:conteId')
  @ApiOperation({ summary: 'Lister les réactions d’un conte' })
  @ApiParam({
    name: 'conteId',
    example: 'conte-uuid-456',
  })
  findByConte(@Param('conteId') conteId: string) {
    return this.reactionsService.findByConte(conteId);
  }

  // =========================
  // FIND BY USER
  // =========================
  @Get('user/:userId')
  @ApiOperation({ summary: 'Lister les réactions d’un utilisateur' })
  @ApiParam({
    name: 'userId',
    example: 'user-uuid-123',
  })
  findByUser(@Param('userId') userId: string) {
    return this.reactionsService.findByUser(userId);
  }

  // =========================
  // COUNT BY CONTE
  // =========================
  @Get('conte/:conteId/count')
  @ApiOperation({ summary: 'Compter les réactions d’un conte' })
  @ApiParam({
    name: 'conteId',
    example: 'conte-uuid-456',
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        love: 10,
        like: 5,
        dislike: 1,
      },
    },
  })
  countByConte(@Param('conteId') conteId: string) {
    return this.reactionsService.countByConte(conteId);
  }

  // =========================
  // DELETE
  // =========================
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une réaction' })
  @ApiParam({
    name: 'id',
    example: 'reaction-uuid',
  })
  remove(@Param('id') id: string) {
    return this.reactionsService.remove(id);
  }
}
