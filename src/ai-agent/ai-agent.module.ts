import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiAgentService } from './ai-agent.service';
import { AiAgentController } from './ai-agent.controller';
import { PostsService } from 'src/posts/posts.service';
import { PostsModule } from 'src/posts/posts.module';
import { Analysis } from './entities/analysis.entity';

@Module({
  imports: [PostsModule, TypeOrmModule.forFeature([Analysis])],
  controllers: [AiAgentController],
  providers: [AiAgentService, PostsService],
})
export class AiAgentModule { }
