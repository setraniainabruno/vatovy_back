import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reaction, ReactionType } from './entities/reaction.entity';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(Reaction)
    private readonly reactionRepo: Repository<Reaction>,
  ) {}

  // =========================
  // CREATE / TOGGLE REACTION
  // =========================

  async react(dto: {
    userId: string;
    conteId: string;
    type: ReactionType;
  }) {
    const existing = await this.reactionRepo.findOne({
      where: {
        userId: dto.userId,
        conteId: dto.conteId,
      },
    });

    // =========================
    // TOGGLE LOGIC
    // =========================
    if (existing) {
      // même type → delete (unlike)
      if (existing.type === dto.type) {
        await this.reactionRepo.remove(existing);
        return { message: 'Reaction removed' };
      }

      // change reaction type
      existing.type = dto.type;
      return this.reactionRepo.save(existing);
    }

    // create new reaction
    const reaction = this.reactionRepo.create(dto);
    return this.reactionRepo.save(reaction);
  }

  // =========================
  // FIND BY CONTE
  // =========================

  async findByConte(conteId: string) {
    return this.reactionRepo.find({
      where: { conteId },
      order: { createdAt: 'DESC' },
    });
  }

  // =========================
  // FIND BY USER
  // =========================

  async findByUser(userId: string) {
    return this.reactionRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  // =========================
  // COUNT BY CONTE
  // =========================

  async countByConte(conteId: string) {
    return this.reactionRepo.count({
      where: { conteId },
    });
  }

  // =========================
  // DELETE REACTION
  // =========================

  async remove(id: string) {
    const reaction = await this.reactionRepo.findOne({
      where: { id },
    });

    if (!reaction) {
      throw new BadRequestException('Reaction not found');
    }

    return this.reactionRepo.remove(reaction);
  }
}
