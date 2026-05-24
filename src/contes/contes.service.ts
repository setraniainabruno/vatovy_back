import { Injectable } from '@nestjs/common';
import { CreateConteDto } from './dto/create-conte.dto';
import { UpdateConteDto } from './dto/update-conte.dto';

@Injectable()
export class ContesService {
  create(createConteDto: CreateConteDto) {
    return 'This action adds a new conte';
  }

  findAll() {
    return `This action returns all contes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conte`;
  }

  update(id: number, updateConteDto: UpdateConteDto) {
    return `This action updates a #${id} conte`;
  }

  remove(id: number) {
    return `This action removes a #${id} conte`;
  }
}
