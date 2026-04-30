import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: null, nullable: true })
  password: string;

  @Column()
  name: string;

  @Column({ default: null, nullable: true })
  avatar: string;

  @Column({ default: 'user' })
  role: 'admin' | 'user';

  @Column('simple-array', { default: '' })
  favorites: string[];
}
