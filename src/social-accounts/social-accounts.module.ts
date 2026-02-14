import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialAccountsService } from './social-accounts.service';
import { SocialAccountsController } from './social-accounts.controller';
import { SocialAccount } from './entities/social-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocialAccount])],
  controllers: [SocialAccountsController],
  providers: [SocialAccountsService],
  exports: [TypeOrmModule],
})
export class SocialAccountsModule {}
