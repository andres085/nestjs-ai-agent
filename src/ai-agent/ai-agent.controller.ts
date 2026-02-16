import { Controller, Post, Body } from '@nestjs/common';
import { AiAgentService } from './ai-agent.service';
import { AnalysisRequestDto } from './dto/analysis-request.dto';

@Controller('ai-agent')
export class AiAgentController {
  constructor(private readonly aiAgentService: AiAgentService) { }

  @Post('analyze')
  async analyze(@Body() analysisRequestDto: AnalysisRequestDto) {
    return await this.aiAgentService.analyze(analysisRequestDto);
  }
}
