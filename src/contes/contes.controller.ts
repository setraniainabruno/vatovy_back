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
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

import { ContesService } from './contes.service';
import { CreateConteDto } from './dto/create-conte.dto';
import { UpdateConteDto } from './dto/update-conte.dto';

@ApiTags('Contes')
@Controller('contes')
export class ContesController {
  constructor(private readonly contesService: ContesService) {}

  // =========================
  // CREATE
  // =========================
  @Post()
  @ApiOperation({
    summary: 'Créer un conte avec audio et thumbnail',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Le Petit Chaperon Rouge',
        },
        description: {
          type: 'string',
          example: 'Une fillette traverse la forêt pour voir sa grand-mère.',
        },
        categoryId: {
          type: 'string',
          example: 'c1f2a9d0-1234-4567-89ab-123456789abc',
        },
        thumbnail: {
          type: 'string',
          format: 'binary',
        },
        audio: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Conte créé avec succès',
    schema: {
      example: {
        id: 'a12b34cd-5678-90ef-ghij-klmnopqrstuv',
        title: 'Le Petit Chaperon Rouge',
        description: 'Une fillette traverse la forêt...',
        categoryId: 'c1f2a9d0-1234-4567-89ab-123456789abc',
        thumbnail: 'https://imagekit.io/thumb.jpg',
        audioUrl: 'https://imagekit.io/audio.mp3',
        durationSeconds: 320,
        duration: '5:20',
        playCount: 0,
        isActive: true,
        createdAt: '2026-05-25T10:00:00.000Z',
        updatedAt: '2026-05-25T10:00:00.000Z',
      },
    },
  })
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
  // FIND ALL
  // =========================
  @Get()
  @ApiOperation({
    summary: 'Récupérer tous les contes (pagination)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des contes',
    schema: {
      example: {
        data: [
          {
            id: 'uuid-1',
            title: 'Conte 1',
            description: 'Description...',
            categoryId: 'cat-1',
          },
        ],
        total: 50,
        page: 1,
        totalPage: 5,
      },
    },
  })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.contesService.findAll(Number(page), Number(limit));
  }

  // =========================
  // FIND ONE
  // =========================
  @Get(':id')
  @ApiOperation({
    summary: 'Récupérer un conte par ID',
  })
  @ApiParam({
    name: 'id',
    example: 'a12b34cd-5678-90ef-ghij-klmnopqrstuv',
  })
  @ApiResponse({
    status: 200,
    description: 'Conte trouvé',
    schema: {
      example: {
        id: 'a12b34cd-5678-90ef-ghij-klmnopqrstuv',
        title: 'Le Petit Chaperon Rouge',
        description: 'Une fillette traverse la forêt...',
        playCount: 10,
      },
    },
  })
  async findOne(@Param('id') id: string) {
    return this.contesService.findOne(id);
  }

  // =========================
  // UPDATE
  // =========================
  @Patch(':id')
  @ApiOperation({
    summary: 'Modifier un conte',
  })
  @ApiParam({
    name: 'id',
    example: 'a12b34cd-5678-90ef-ghij-klmnopqrstuv',
  })
  @ApiResponse({
    status: 200,
    description: 'Conte mis à jour',
    schema: {
      example: {
        message: 'Conte updated successfully',
      },
    },
  })
  async update(@Param('id') id: string, @Body() dto: UpdateConteDto) {
    return this.contesService.update(id, dto);
  }

  // =========================
  // DELETE
  // =========================
  @Delete(':id')
  @ApiOperation({
    summary: 'Supprimer un conte',
  })
  @ApiParam({
    name: 'id',
    example: 'a12b34cd-5678-90ef-ghij-klmnopqrstuv',
  })
  @ApiResponse({
    status: 200,
    description: 'Conte supprimé',
    schema: {
      example: {
        message: 'Conte supprimé avec succès',
      },
    },
  })
  async remove(@Param('id') id: string) {
    return this.contesService.remove(id);
  }

  // =========================
  // PLAY COUNT
  // =========================
  @Patch(':id/play')
  @ApiOperation({
    summary: 'Incrémenter le nombre de lectures',
  })
  @ApiParam({
    name: 'id',
    example: 'a12b34cd-5678-90ef-ghij-klmnopqrstuv',
  })
  @ApiResponse({
    status: 200,
    description: 'Play count incrémenté',
    schema: {
      example: {
        playCount: 11,
      },
    },
  })
  async incrementPlay(@Param('id') id: string) {
    return this.contesService.incrementPlayCount(id);
  }
}
