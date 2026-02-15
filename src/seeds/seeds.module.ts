import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';
import { SocialAccountsModule } from '../social-accounts/social-accounts.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [SocialAccountsModule, PostsModule],
  controllers: [SeedsController],
  providers: [SeedsService],
})
export class SeedsModule {}
