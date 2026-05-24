import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  async create(dto: CreateCommentDto) {
    const comment = this.commentRepo.create(dto);
    return this.commentRepo.save(comment);
  }

  async findByConte(conteId: string) {
    return this.commentRepo.find({
      where: { conteId },
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: string) {
    const result = await this.commentRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Commentaire introuvable');
    }

    return { message: 'Commentaire supprimé avec succès' };
  }
}
