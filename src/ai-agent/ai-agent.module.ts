import { Module } from '@nestjs/common';
import { AiAgentService } from './ai-agent.service';
import { AiAgentController } from './ai-agent.controller';
import { PostsService } from 'src/posts/posts.service';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [PostsModule],
  controllers: [AiAgentController],
  providers: [AiAgentService, PostsService],
})
export class AiAgentModule { }
