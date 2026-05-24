import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContesService } from './contes.service';
import { CreateConteDto } from './dto/create-conte.dto';
import { UpdateConteDto } from './dto/update-conte.dto';

@Controller('contes')
export class ContesController {
  constructor(private readonly contesService: ContesService) {}

  @Post()
  create(@Body() createConteDto: CreateConteDto) {
    return this.contesService.create(createConteDto);
  }

  @Get()
  findAll() {
    return this.contesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConteDto: UpdateConteDto) {
    return this.contesService.update(+id, updateConteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contesService.remove(+id);
  }
}
