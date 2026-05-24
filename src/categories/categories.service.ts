import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  // CREATE
  async create(dto: CreateCategoryDto) {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  // FIND ALL
  async findAll() {
    return this.categoryRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  // FIND ONE
  async findOne(id: string) {
    const category = await this.categoryRepo.findOne({
      where: { id },
    });

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  // UPDATE
  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    Object.assign(category, dto);

    return this.categoryRepo.save(category);
  }

  // DELETE
  async remove(id: string) {
    const category = await this.findOne(id);
    return this.categoryRepo.remove(category);
  }
}
