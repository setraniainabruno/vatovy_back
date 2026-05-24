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

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // =========================
  // IDS
  // =========================

  @Index()
  @Column()
  conteId: string;

  @Index()
  @Column()
  userId: string;

  // =========================
  // RELATIONS
  // =========================

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Conte, (conte) => conte.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'conteId' })
  conte: Conte;

  // =========================
  // DATA
  // =========================

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
