import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Conte } from '../../contes/entities/conte.entity';

export type ReactionType = 'love' | 'like' | 'dislike';

@Entity({ name: 'reactions' })
export class Reaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // =========================
  // IDS (FAST QUERY)
  // =========================

  @Index()
  @Column()
  conteId: string;

  @Index()
  @Column()
  userId: string;

  // =========================
  // RELATIONS (JOIN SUPPORT)
  // =========================

  @ManyToOne(() => Conte, (conte) => conte.reactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'conteId' })
  conte: Conte;

  @ManyToOne(() => User, (user) => user.reactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'enum',
    enum: ['love', 'like', 'dislike'],
  })
  type: ReactionType;

  @CreateDateColumn()
  createdAt: Date;
}
