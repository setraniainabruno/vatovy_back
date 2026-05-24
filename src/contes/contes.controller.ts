import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { ContesService } from './contes.service';
import { CreateConteDto } from './dto/create-conte.dto';
import { UpdateConteDto } from './dto/update-conte.dto';

@Controller('contes')
export class ContesController {
  constructor(private readonly contesService: ContesService) {}

  // =========================
  // CREATE (upload audio + thumbnail)
  // =========================
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  async create(
    @Body() dto: CreateConteDto,
    @UploadedFiles()
    files: {
      thumbnail?: Express.Multer.File[];
      audio?: Express.Multer.File[];
    },
  ) {
    const thumbnailFile = files?.thumbnail?.[0];
    const audioFile = files?.audio?.[0];

    return this.contesService.create(dto, thumbnailFile, audioFile);
  }

  // =========================
  // FIND ALL (pagination)
  // =========================
  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.contesService.findAll(Number(page), Number(limit));
  }

  // =========================
  // FIND ONE
  // =========================
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.contesService.findOne(id);
  }

  // =========================
  // UPDATE
  // =========================
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateConteDto) {
    return this.contesService.update(id, dto);
  }

  // =========================
  // DELETE
  // =========================
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.contesService.remove(id);
  }

  // =========================
  // PLAY COUNT INCREMENT
  // =========================
  @Patch(':id/play')
  async incrementPlay(@Param('id') id: string) {
    return this.contesService.incrementPlayCount(id);
  }
}
