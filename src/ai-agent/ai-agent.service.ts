import { anthropic } from '@ai-sdk/anthropic';
import { Injectable } from '@nestjs/common';
import { generateText, stepCountIs } from 'ai';
import { PostsService } from 'src/posts/posts.service';
import { AnalysisRequestDto } from './dto/analysis-request.dto';
import { analyzePerformanceTool } from './tools/analyze-performance.tool';
import { createScheduleTool } from './tools/create-schedule.tool';
import { generateContentIdeasTool } from './tools/generate-content-ideas.tool';

@Injectable()
export class AiAgentService {
  constructor(private readonly postsService: PostsService) {}

  async analyze(analysisRequestDto: AnalysisRequestDto) {
    const { socialAccountId, timePeriod } = analysisRequestDto;

    const result = await generateText({
      model: anthropic('claude-haiku-4-5-20251001'),
      prompt: `You are a social media data analysis agent. You must complete these steps:

        1. First, call analyzePerformance with socialAccountId: "${socialAccountId}" and timePeriod: ${timePeriod}
        2. Then, call generateContentIdeas using count: 3 and the topTopics (as an array of topic strings), bestDays, and bestHours from the analyzePerformance result
        3. Then, call createSchedule using postsPerWeek: 3 and the bestDays and bestHours from the analyzePerformance result
        4. Finally, after all tools have been called, write a comprehensive professional report with these sections:

        ### Performance Insights
        Analyze the data and highlight the most important patterns. Be specific about what's working best.

        ### Content Recommendations
        Present the 3 content ideas with creative, actionable descriptions. Explain WHY each idea will perform well based on the data.

        ### Posting Schedule
        Present the optimal posting schedule in a clear, easy-to-follow format.

        Be professional, specific, and actionable. Focus on insights that will help improve social media performance.`,

      tools: {
        analyzePerformance: analyzePerformanceTool(this.postsService),
        generateContentIdeas: generateContentIdeasTool,
        createSchedule: createScheduleTool,
      },
      stopWhen: stepCountIs(10),
    });

    const allToolResults = result.steps.flatMap((step) => step.toolResults);

    const performanceData: any = allToolResults.find(
      (t) => t.toolName === 'analyzePerformance',
    )?.output;

    const contentIdeas: any = allToolResults.find(
      (t) => t.toolName === 'generateContentIdeas',
    )?.output;

    const scheduleData: any = allToolResults.find(
      (t) => t.toolName === 'createSchedule',
    )?.output;

    return {
      summary: result.text,

      insights: performanceData,
      contentSuggestions: contentIdeas?.ideas,
      schedule: scheduleData?.schedule,

      usage: result.usage,
    };
  }
}
