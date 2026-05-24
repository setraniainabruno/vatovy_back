import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { CommentsService } from './comment.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() dto: any) {
    return this.commentsService.create(dto);
  }

  @Get('conte/:conteId')
  findByConte(@Param('conteId') conteId: string) {
    return this.commentsService.findByConte(conteId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
