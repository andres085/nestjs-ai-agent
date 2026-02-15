import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocialAccountsModule } from './social-accounts/social-accounts.module';
import { PostsModule } from './posts/posts.module';
import { SocialAccount } from './social-accounts/entities/social-account.entity';
import { Post } from './posts/entities/post.entity';
import { SeedsModule } from './seeds/seeds.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT!, 10) || 5432,
      username: process.env.DB_USERNAME || 'dev',
      password: process.env.DB_PASSWORD || 'dev123',
      database: process.env.DB_NAME || 'social_analyzer',
      entities: [SocialAccount, Post],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV === 'development',
    }),
    SocialAccountsModule,
    PostsModule,
    SeedsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
