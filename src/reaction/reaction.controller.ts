import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { ReactionsService } from './reaction.service';
import { ReactionType } from './entities/reaction.entity';

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post()
  react(
    @Body()
    dto: {
      userId: string;
      conteId: string;
      type: ReactionType;
    },
  ) {
    return this.reactionsService.react(dto);
  }

  @Get('conte/:conteId')
  findByConte(@Param('conteId') conteId: string) {
    return this.reactionsService.findByConte(conteId);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.reactionsService.findByUser(userId);
  }

  @Get('conte/:conteId/count')
  countByConte(@Param('conteId') conteId: string) {
    return this.reactionsService.countByConte(conteId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reactionsService.remove(id);
  }
}
