import { Comment } from 'src/comment/entities/comment.entity';
import { Reaction } from 'src/reaction/entities/reaction.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ unique: true })
  email: string;

  @Column({ default: null, nullable: true })
  password: string;

  @Column()
  name: string;

  @Column({ default: null, nullable: true })
  avatar: string;

  @Index()
  @Column({ default: 'user' })
  role: 'admin' | 'user';

  @Column('simple-array', { default: '' })
  favorites: string[];

  // =========================
  // RELATION CHILD
  // =========================

  @OneToMany(() => Reaction, (reaction) => reaction.user)
  reactions: Reaction[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  // =========================
  // TIMESTAMPS
  // =========================

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
