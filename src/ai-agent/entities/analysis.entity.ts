import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SocialAccount } from '../../social-accounts/entities/social-account.entity';

@Entity('analyses')
export class Analysis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SocialAccount, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'social_account_id' })
  socialAccount: SocialAccount;

  @Column({ name: 'social_account_id' })
  socialAccountId: string;

  @Column({ type: 'varchar', nullable: true })
  text: string;

  @Column({ type: 'int' })
  timePeriod: number;

  @Column({ type: 'jsonb', nullable: true })
  insights: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  suggestions: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
