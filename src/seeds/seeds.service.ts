import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialAccount } from '../social-accounts/entities/social-account.entity';
import { Post } from '../posts/entities/post.entity';
import { socialAccountsSeeds, postsSeeds } from './data';

@Injectable()
export class SeedsService {
  constructor(
    @InjectRepository(SocialAccount)
    private readonly socialAccountsRepository: Repository<SocialAccount>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async run() {
    const savedAccounts = await this.socialAccountsRepository.save(
      this.socialAccountsRepository.create(socialAccountsSeeds),
    );

    const savedPosts = await this.postsRepository.save(
      this.postsRepository.create(postsSeeds),
    );

    return {
      message: 'Database seeded successfully',
      socialAccounts: savedAccounts.length,
      posts: savedPosts.length,
    };
  }
}
