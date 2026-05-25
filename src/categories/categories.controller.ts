import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // =========================
  // CREATE
  // =========================
  @Post()
  @ApiOperation({ summary: 'Créer une catégorie' })
  @ApiResponse({
    status: 201,
    description: 'Catégorie créée avec succès',
    schema: {
      example: {
        id: 'c1f2a9d0-1234-4567-89ab-123456789abc',
        name: 'Contes Fantastiques',
        createdAt: '2026-05-25T10:00:00.000Z',
        updatedAt: '2026-05-25T10:00:00.000Z',
      },
    },
  })
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  // =========================
  // FIND ALL
  // =========================
  @Get()
  @ApiOperation({ summary: 'Lister toutes les catégories' })
  @ApiResponse({
    status: 200,
    description: 'Liste des catégories',
    schema: {
      example: [
        {
          id: '1',
          name: 'Contes Classiques',
        },
        {
          id: '2',
          name: 'Contes Fantastiques',
        },
      ],
    },
  })
  findAll() {
    return this.categoriesService.findAll();
  }

  // =========================
  // FIND ONE
  // =========================
  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une catégorie par ID' })
  @ApiParam({
    name: 'id',
    example: 'c1f2a9d0-1234-4567-89ab-123456789abc',
  })
  @ApiResponse({
    status: 200,
    description: 'Catégorie trouvée',
  })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  // =========================
  // UPDATE
  // =========================
  @Patch(':id')
  @ApiOperation({ summary: 'Modifier une catégorie' })
  @ApiParam({
    name: 'id',
    example: 'c1f2a9d0-1234-4567-89ab-123456789abc',
  })
  @ApiResponse({
    status: 200,
    description: 'Catégorie mise à jour',
  })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(id, dto);
  }

  // =========================
  // DELETE
  // =========================
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une catégorie' })
  @ApiParam({
    name: 'id',
    example: 'c1f2a9d0-1234-4567-89ab-123456789abc',
  })
  @ApiResponse({
    status: 200,
    description: 'Catégorie supprimée avec succès',
  })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
