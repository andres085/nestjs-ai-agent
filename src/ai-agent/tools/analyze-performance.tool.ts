import { tool } from 'ai';
import { PostsService } from 'src/posts/posts.service';
import { z } from 'zod';

export const analyzePerformanceTool = (postsService: PostsService) =>
  tool({
    description: 'Get engagement analytics from database',
    inputSchema: z.object({
      socialAccountId: z.string(),
      timePeriod: z.number(),
    }),
    execute: async ({ socialAccountId, timePeriod }) => {
      return await postsService.findPerformanceAnalytics(
        socialAccountId,
        timePeriod,
      );
    },
  });
