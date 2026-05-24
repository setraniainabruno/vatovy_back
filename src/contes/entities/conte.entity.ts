import { Category } from 'src/categories/entities/category.entity';
import { Reaction } from 'src/reaction/entities/reaction.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'contes' })
export class Conte {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 150 })
  title: string;

  @ManyToOne(() => Category, (category) => category.contes, {
    eager: true, // auto load category
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Index()
  @Column({ nullable: true })
  categoryId: string;

  @Index()
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int', unsigned: true, default: 0 })
  durationSeconds: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  duration?: string;

  @Column({ type: 'text' })
  thumbnail: string;

  @Column({ type: 'text' })
  audioUrl: string;

  @Column({ type: 'int', unsigned: true, default: 0 })
  playCount: number;

   // =========================
  // RELATION CHILD
  // =========================

  @OneToMany(() => Reaction, (reaction) => reaction.conte)
  reactions: Reaction[];
}
