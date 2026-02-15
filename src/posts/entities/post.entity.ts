import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SocialAccount } from '../../social-accounts/entities/social-account.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SocialAccount, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'social_account_id' })
  socialAccount: SocialAccount;

  @Column({ name: 'social_account_id' })
  socialAccountId: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  topic: string;

  @Column({ type: 'timestamp' })
  publishedAt: Date;

  @Column({ type: 'timestamp' })
  scrapedAt: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  dayOfWeek: string;

  @Column({ type: 'int', nullable: true })
  hourOfDay: number;

  @Column({ type: 'int', default: 0 })
  likesCount: number;

  @Column({ type: 'int', default: 0 })
  commentsCount: number;

  @Column({ type: 'int', default: 0 })
  sharesCount: number;

  @Column({ type: 'boolean', default: false })
  hasImage: boolean;

  @Column({ type: 'boolean', default: false })
  hasVideo: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
